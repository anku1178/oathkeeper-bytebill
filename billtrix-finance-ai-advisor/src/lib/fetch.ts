// lib/fetch.ts
import { supabase } from './supabase';

export async function fetchUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single(); // ensures only one row is expected

    if (error || !data) {
      console.error('Error fetching user profile:', error ?? 'No data found');
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error fetching user profile:', err);
    return null;
  }
}
