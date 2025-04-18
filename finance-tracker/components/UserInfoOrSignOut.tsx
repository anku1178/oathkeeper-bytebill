import { useAuth } from "@/components/AuthContext";

export default function UserInfoOrSignOut() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div style={{ margin: '16px 0' }}>
      <div>Signed in as: {user.displayName || user.email}</div>
      <img src={user.photoURL || ''} alt="User avatar" width={40} height={40} style={{ borderRadius: 20, margin: '8px 0' }} />
      <button onClick={signOut} style={{ padding: 8, fontSize: 16, marginTop: 8 }}>Sign Out</button>
    </div>
  );
}
