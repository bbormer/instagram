import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqb25ueHdzcW1veXNxZnhjdGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE3Mjc5MDAsImV4cCI6MTk5NzMwMzkwMH0.vn7humgj5pHADrcVV9RXM3dDUiVG5Aq8F4OSsbqFB18";

export const supabase = createClient(supabaseUrl, supabaseKey);
