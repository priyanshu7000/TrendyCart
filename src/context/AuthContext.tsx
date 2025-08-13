import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged , signOut } from "firebase/auth";
import type {User } from "firebase/auth";
type AuthCtx = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({ user: null, loading: true, logout: async () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const logout = () => signOut(auth);

  return <Ctx.Provider value={{ user, loading, logout }}>{children}</Ctx.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(Ctx);
