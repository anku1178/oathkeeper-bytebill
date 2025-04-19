import { supabase } from './supabase';
import { toast } from '@/components/ui/use-toast';

// Sign in with Google OAuth
export const signInWithGoogle = async () => {
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

    if (error) {
      console.error('Error signing in with Google:', error);
      toast({
        title: 'Authentication Error',
        description: error.message || 'Failed to sign in with Google',
        variant: 'destructive',
      });
      throw error;
    }

    // Store Gmail token after sign-in
    const userResponse = await supabase.auth.getUser();
    if (userResponse.data.user) {
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.provider_token;
      await storeGmailToken(userResponse.data.user.id, accessToken);
    }

    return data;
  } catch (error: any) {
    console.error('Error in signInWithGoogle:', error);
    toast({
      title: 'Authentication Error',
      description: error?.message || 'An unexpected error occurred',
      variant: 'destructive',
    });
    throw error;
  }
};

// Store Gmail Token in Supabase
const storeGmailToken = async (userId: string, accessToken: string) => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .upsert({ id: userId, gmail_token: accessToken });

    if (error) {
      console.error('Error storing Gmail token:', error);
    } else {
      console.log('Gmail token stored successfully');
    }
  } catch (err) {
    console.error('Error in storeGmailToken:', err);
  }
};

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting current user:', error);
    return null;
  }
  return user;
};

// Get user profile data
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error in getUserProfile:', err);
    return null;
  }
};

// Create or update user profile
export const upsertUserProfile = async (profile: any) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(profile)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Error in upsertUserProfile:', err);
    throw err;
  }
};

// Fetch Gmail Emails
const fetchGmailEmails = async (accessToken: string) => {
  try {
    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!data.messages) {
      console.warn('No emails found.');
      return;
    }

    const emailDetails = await Promise.all(
      data.messages.slice(0, 10).map(async (msg: any) => {
        const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const detail = await res.json();

        const headers = detail.payload.headers;
        const subjectHeader = headers?.find((h: any) => h.name === 'Subject');
        const dateHeader = headers?.find((h: any) => h.name === 'Date');

        return {
          email_id: msg.id,
          subject: subjectHeader?.value || detail.snippet || '(No Subject)',
          date: dateHeader?.value || new Date().toISOString(),
        };
      })
    );

    await saveEmailsToDatabase(emailDetails);
  } catch (error) {
    console.error('Error fetching Gmail emails:', error);
  }
};

// Save Emails to Supabase
const saveEmailsToDatabase = async (emails: any[]) => {
  const user = await getCurrentUser();
  if (!user) {
    console.error('No user signed in');
    return;
  }

  try {
    const { error } = await supabase
      .from('gmail_emails')
      .upsert(
        emails.map(email => ({
          ...email,
          user_id: user.id,
        }))
      );

    if (error) {
      console.error('Error saving emails:', error);
    } else {
      console.log('Emails saved successfully');
    }
  } catch (err) {
    console.error('Error in saveEmailsToDatabase:', err);
  }
};

// Sync Gmail Emails for the current user
export const syncGmail = async () => {
  const user = await getCurrentUser();
  if (!user) {
    console.error('No user is signed in');
    return;
  }

  const userProfile = await getUserProfile(user.id);
  const accessToken = userProfile?.gmail_token;

  if (!accessToken) {
    console.error('No Gmail token available');
    return;
  }

  await fetchGmailEmails(accessToken);
};
