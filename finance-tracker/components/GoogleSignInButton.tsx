import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function GoogleSignInButton() {
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // User is now signed in!
    } catch (error) {
      alert("Sign in failed: " + (error as Error).message);
    }
  };

  return (
    <button onClick={handleSignIn}>Sign in with Google</button>
  );
}