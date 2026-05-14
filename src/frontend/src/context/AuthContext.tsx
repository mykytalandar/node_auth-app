import { createContext, useMemo, useState } from 'react';
import type { ProfileUser } from '../types/User';

type AuthContextType = {
  user: ProfileUser | null,
  setUser: (user: ProfileUser) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<ProfileUser | null>(null);

  const value = useMemo(() => ({
    user,
    setUser
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
