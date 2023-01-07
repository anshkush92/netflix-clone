import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

import { auth } from '../../firebase';

import AuthContext from '../../contexts/auth';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  // Getting the user type from the firebase
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  /**
   * @param email - Email of the user
   * @param password - Password of the user
   * @function register - Function to register a user
   */
  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Creating a user with email and password
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(result.user);
      // Redirecting to the home page, after successful sign up
      router.push('/login');
      setIsLoading(false);
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:39 ~ register ~ error', error);
    } finally {
      // This is always going to run no matter what happens
      setIsLoading(false);
    }
  };

  /**
   * @param email - Email of the user
   * @param password - Password of the user
   * @function login - Function to login a user
   */
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Logging in a user with email and password
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      // Redirecting to the home page, after successful sign up
      router.push('/');
      setIsLoading(false);
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:56 ~ login ~ error', error);
    } finally {
      // This is always going to run no matter what happens
      setIsLoading(false);
    }
  };

  /**
   * @function logout - Function to logout a user
   */
  const logout = async () => {
    setIsLoading(true);
    try {
      // Logging out the user
      signOut(auth);
      setUser(null);
      // Redirecting to the home page, after successful sign up
      router.push('/login');
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:73 ~ logout ~ error', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Listening to the auth state changes and persisting the user, as user goes to null if refreshed, accepts the "auth" instance and gives back the "user"
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Means the user is already logged in
        setUser(user);
        setIsLoading(false);
      } else {
        // Means the user is not logged in, so we move to the login page
        setUser(null);
        setIsLoading(true);
        router.push('/login');
      }
    });
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        loading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
