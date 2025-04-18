import { useAuth } from "@/components/AuthContext";

export async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}) {
  const { user } = useAuth();
  if (!user) throw new Error("Not authenticated");
  const token = await user.getIdToken();
  const headers = {
    ...(init.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  return fetch(input, { ...init, headers });
}
