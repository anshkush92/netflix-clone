// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD_JEVTEjmO7ooxxTgKwsc6o5A5UUytE20',
  authDomain: 'netflix-clone-d926e.firebaseapp.com',
  projectId: 'netflix-clone-d926e',
  storageBucket: 'netflix-clone-d926e.appspot.com',
  messagingSenderId: '1079060577920',
  appId: '1:1079060577920:web:5f45bd6acd9b714883f065',
};

// Initialize Firebase
// Using this way to initialize only one instance of our firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Initialize Firestore
const db = getFirestore();
// Initialize Authentication
const auth = getAuth();

// Export the initialized firebase app
export default app;
// Export the initialized authentication and firestore
export { auth, db };
