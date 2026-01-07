
import { createClient } from '@supabase/supabase-js';

// These environment variables should be set in your project environment
const supabaseUrl = (process.env as any).SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = (process.env as any).SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
