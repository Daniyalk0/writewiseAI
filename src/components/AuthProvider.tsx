"use client";

import { User } from "firebase/auth";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  anonymousLoading: boolean;
  setAnonymousLoading: (value: boolean) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  anonymousLoading: false,
  setAnonymousLoading: () => {},
  currentUser: null,
  setCurrentUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [anonymousLoading, setAnonymousLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        anonymousLoading,
        setAnonymousLoading,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
