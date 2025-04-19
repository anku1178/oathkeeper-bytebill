// AppLayout.tsx
import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import AIAssistant from '../ai/AIAssistant';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from '@/components/ui/spinner';
import { fetchUserProfile } from '@/lib/fetch';
import { toast } from '@/components/ui/use-toast';
import { User } from '@supabase/supabase-js';

const AppLayout = () => {
  const { user, loading } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [assistantOpen, setAssistantOpen] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        try {
          const profile = await fetchUserProfile(user.id);
          if (!profile) {
            toast({
              title: 'Profile Error',
              description: 'No profile data found for this user.',
              variant: 'destructive',
            });
            return;
          }
          setUserProfile(profile);
        } catch (error: any) {
          console.error('Error loading user profile:', error);
          toast({
            title: 'Error',
            description: error.message || 'Failed to load user profile',
            variant: 'destructive',
          });
        } finally {
          setProfileLoading(false);
        }
      } else {
        setProfileLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  if (loading || profileLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          user={{
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            email: user.email || '',
            avatar: user.user_metadata?.avatar_url || '',
          }}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      <AIAssistant isOpen={assistantOpen} setIsOpen={setAssistantOpen} />
    </div>
  );
};

export default AppLayout;
