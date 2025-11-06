// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hbhtxenymlvlibculjiz.supabase.co';  // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiaHR4ZW55bWx2bGliY3Vsaml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzODgzMTIsImV4cCI6MjA3Nzk2NDMxMn0.JV_So96IT7iFn6eBvzHqr7GPikfhRr0VoLHwImMLGeY';  // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
