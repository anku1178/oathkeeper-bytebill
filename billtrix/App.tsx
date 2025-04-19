import { useEffect } from 'react';
import { supabase } from './app/services/supabase';

export default function App() {
  useEffect(() => {
    const checkSupabase = async () => {
      const { data, error } = await supabase.from('your_table').select('*');
      console.log('Data:', data);
      console.log('Error:', error);
    };
    checkSupabase();
  }, []);

  return null;
}
