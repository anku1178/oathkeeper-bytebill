import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Mock user state

  // Mock auth functions
  const login = (email, password) => setUser({ name: 'Alex', email });
  const logout = () => setUser(null);
  const signup = (name, email, password) => setUser({ name, email });
  const resetPassword = (email) => true;

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}
