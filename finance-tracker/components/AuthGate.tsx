"use client";
import { useAuth } from "@/components/AuthContext";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import UserInfoOrSignOut from "@/components/UserInfoOrSignOut";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <GoogleSignInButton />;
  return (
    <>
      <UserInfoOrSignOut />
      {children}
    </>
  );
}
