import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jakeispkrvnzqgpemzum.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impha2Vpc3BrcnZuenFncGVtenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NDUyNzcsImV4cCI6MjA2MTQyMTI3N30.zNJMFdXt6nZyXQJBH0oVTMA1yX1WYs6ts6IG498gJ5c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 