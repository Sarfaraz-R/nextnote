// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth ,GoogleAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'nextnote-654fe.firebaseapp.com',
  projectId: 'nextnote-654fe',
  storageBucket: 'nextnote-654fe.firebasestorage.app',
  messagingSenderId: '586959977502',
  appId: '1:586959977502:web:41a7bdb76edb300e7e020f',
  measurementId: 'G-CZ1HH55474',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
