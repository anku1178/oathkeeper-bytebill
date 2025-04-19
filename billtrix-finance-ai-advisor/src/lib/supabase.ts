import { createClient } from '@supabase/supabase-js';

const isDev = import.meta.env.MODE === 'development';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || (isDev ? process.env.SUPABASE_URL : '');
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || (isDev ? process.env.SUPABASE_ANON_KEY : '');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(`
    ⚠️ Missing Supabase configuration:
    ${!supabaseUrl ? 'VITE_SUPABASE_URL is missing' : ''}
    ${!supabaseAnonKey ? 'VITE_SUPABASE_ANON_KEY is missing' : ''}
    
    Please set these in your environment variables (.env file).
  `);
}

export const supabase = createClient(
  supabaseUrl || 'http://localhost:54321',
  supabaseAnonKey || 'placeholder-key'
);

// Database types
export type Badge = {
  id: number;
  name: string;
  description: string;
  icon: string;
  date?: string;
  progress?: number;
  user_id: string;
  is_earned: boolean;
};

export type Expense = {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  source: string;
  user_id: string;
};

export type Goal = {
  id: number;
  name: string;
  target: number;
  current: number;
  deadline: string;
  user_id: string;
};

export type Receipt = {
  id: number;
  vendor: string;
  amount: number | string; 
  date: string;
  status?: string; 
  subject: string;
  user_id: string;
  billStatus?: string; 
  dueDate?: string;    
  invoiceNumber?: string; 
};

export type UserProfile = {
  id: string;
  title: string;
  level: number;
  streakDays: number;
  monthlyBudget: number;
  savingsGoal: number;
  currentPoints: number;
  nextLevel: number;
  gmail_token?: string;
};
