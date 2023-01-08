import { createContext } from 'react';
import { User } from 'firebase/auth';

// Type for the Auth Context
type AuthContextType = {
  user: User | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error?: string | null;
  loading: boolean;
};

// Creating a context with all the initial values
const AuthContext = createContext<AuthContextType>({
  user: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

export default AuthContext;
