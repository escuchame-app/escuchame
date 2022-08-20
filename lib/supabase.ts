import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vatbqjnzvvumjvvqnlsl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdGJxam56dnZ1bWp2dnFubHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA5MjkzMDcsImV4cCI6MTk3NjUwNTMwN30.ftWwqi7i79-OXTHPwx1HD2OyHFR9ubMO8q6LvRsrFvw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});
