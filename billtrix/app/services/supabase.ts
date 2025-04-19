import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'; // Important for React Native URL support

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
