import { createClient } from "https://esm.sh/@supabase/supabase-js@^1.33.2";

export const supabaseClient = createClient(
  // Supabase API URL - env var exported by default when deployed.
  Deno.env.get("SUPABASE_URL") ?? "",
  // Supabase API ANON KEY - env var exported by default when deployed.
  Deno.env.get("SUPABASE_ANON_KEY") ?? ""
);

// WARNING: The service role key has admin priviliges and should only be used in secure environments!
export const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);
