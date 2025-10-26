--- a/original.js
+++ b/original.js
@@ -1,7 +1,7 @@
import { createClient } from '@supabase/supabase-js'

-const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
-const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
+const supabaseUrl = 'https://ofpqjynzyhdhjfgeecve.supabase.co';
+const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mcHFqeW56eWhkaGpmZ2VlY3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzODgyMTgsImV4cCI6MjA3Njk2NDIxOH0.S0PQj3MVJW_eXwnbHFSAFebuwH9NxRZhjs1p9Zj5Mgg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)