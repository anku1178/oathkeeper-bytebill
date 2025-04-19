import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast'; // Assuming you have a custom toast component
import { User } from '@supabase/supabase-js';

// Define the context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signInWithGoogle: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  // Ensure user profile exists after login/signup
  async function ensureUserProfile(user: User | null) {
    if (!user) return;
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', user.id);
    if (!data || data.length === 0) {
      const { error: insertError } = await supabase
        .from('user_profiles')
        .insert([{ id: user.id }]);
      if (insertError) {
        console.error('Error creating user profile:', insertError);
      }
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (window.location.hash) {
          const { data, error } = await supabase.auth.getUser();
          if (error) throw error;
          if (data?.user) {
            setUser(data.user);
            window.history.replaceState({}, document.title, window.location.pathname);
            await ensureUserProfile(data.user); // Ensure user profile exists after login
          }
        } else {
          const { data, error } = await supabase.auth.getUser();
          if (error) throw error;
          if (data?.user) {
            setUser(data.user);
            await ensureUserProfile(data.user); // Ensure user profile exists after login
          }
        }
      } catch (err: any) {
        setError(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'email profile https://www.googleapis.com/auth/gmail.readonly',
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;

      // Store Gmail token or handle further steps here

      return data;
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      toast({
        title: 'Authentication Error',
        description: error.message || 'Failed to sign in with Google',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: 'Sign Out Error',
        description: error.message || 'Failed to sign out.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
