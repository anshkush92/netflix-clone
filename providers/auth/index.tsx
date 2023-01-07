import Router, { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
  console.log('🚀 ~ file: index.tsx:24 ~ AuthProvider ~ user', user);

  const router = useRouter();

  const memoizedValue = useMemo(
    () => ({
      user,
      loading: isLoading,
    }),
    [user, isLoading]
  );

  /**
   * @param email - Email of the user
   * @param password - Password of the user
   * @function register - Function to register a user
   */
  const register = useCallback(
    async (email: string, password: string) => {
      console.log('🚀 ~ Inside register function');
      setIsLoading(true);
      try {
        // Creating a user with email and password
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log('🚀 ~ file: index.tsx:40 ~ register ~ result', result);
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
    },
    [router]
  );

  /**
   * @param email - Email of the user
   * @param password - Password of the user
   * @function login - Function to login a user
   */
  const login = useCallback(
    async (email: string, password: string) => {
      console.log('🚀 ~ file: Inside login function');
      setIsLoading(true);
      try {
        // Logging in a user with email and password
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log('🚀 ~ file: index.tsx:63 ~ login ~ result', result);
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
    },
    [router]
  );

  /**
   * @function logout - Function to logout a user
   */
  const logout = useCallback(async () => {
    console.log('🚀 ~ file: Inside logout function');
    setIsLoading(true);
    try {
      // Logging out the user
      const result = await signOut(auth);
      console.log('🚀 ~ file: index.tsx:84 ~ logout ~ result', result);
      setUser(null);
      // Redirecting to the home page, after successful sign up
      router.push('/login');
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:73 ~ logout ~ error', error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  /**
   * @tutorial https://stackoverflow.com/questions/69203538/useeffect-dependencies-when-using-nextjs-router - How to avoid the infinite re-renders when using the useRouter in useEffect()
   * @description -  Listening to the auth state changes and persisting the user, as user goes to null if refreshed, accepts the "auth" instance and gives back the "user"
   */
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user);
          setIsLoading(false);
        } else {
          // Not logged in...
          setUser(null);
          setIsLoading(true);
          Router.push('/login');
        }
      }),
    []
  );

  const value = { ...memoizedValue, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
