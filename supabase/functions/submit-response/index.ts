// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { definitions } from "../../../types/supabase.ts";
import { supabaseClient } from "../_shared/supabaseClient.ts";

serve(async (req) => {
  supabaseClient.auth.setAuth(
    req.headers.get("Authorization")!.replace("Bearer ", "")
  );

  const userId = supabaseClient.auth.user()?.id;
  if (!userId) {
    return new Response(JSON.stringify({ error: "not logged in" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json();

  const { data, error } = await supabaseClient
    .from<definitions["review_responses"]>("review_response")
    .insert({
      user_id: userId,
      correct: body.correct,
      review_session_id: body.reviewSessionId,
      card_id: body.cardId,
    })
    .single();

  return new Response(JSON.stringify({ data, error }), {
    headers: { "Content-Type": "application/json" },
  });
});
