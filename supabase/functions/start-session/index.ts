import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { definitions } from "../../../types/supabase.ts";
import { supabaseClient } from "../_shared/supabaseClient.ts";

/**
 * start-session
 *
 * Supabase function that create a session if an active one does not exist.
 *
 * "Active" is defined as activity in the past 30 minutes.
 */
serve(async (req) => {
  const JWT = req.headers.get("Authorization")?.replace("Bearer ", "")!;
  const { user } = await supabaseClient.auth.api.getUser(JWT);

  if (!user?.id) {
    return new Response(JSON.stringify({ error: "not logged in" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const now = new Date();
  now.setMinutes(now.getMinutes() - 30);

  const queryResp = await supabaseClient
    .from<definitions["review_sessions"]>("review_sessions")
    .select("*")
    .gt("last_activity_at", now.toISOString())
    .order("created_at")
    .limit(1)
    .maybeSingle();

  let error = queryResp.error;
  let data = queryResp.data;
  console.debug("Selected current session", { error, data });

  if (!data) {
    console.debug("Session not found, inserting");
    const insertResp = await supabaseClient
      .from<definitions["review_sessions"]>("review_sessions")
      .insert({
        user_id: user.id,
      })
      .single();

    error = insertResp.error;
    data = insertResp.data;

    console.debug("Session inserted", { error, data });
  }

  return new Response(JSON.stringify({ data, error }), {
    headers: { "Content-Type": "application/json" },
  });
});
