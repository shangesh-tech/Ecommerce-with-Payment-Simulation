import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup ,createUserWithEmailAndPassword,onAuthStateChanged,signOut} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAHKeXJEz1Xe2tYovBV2qwoSR-PykVFR28",
  authDomain: "reactmart-8ba7c.firebaseapp.com",
  projectId: "reactmart-8ba7c",
  storageBucket: "reactmart-8ba7c.appspot.com",
  messagingSenderId: "820609175129",
  appId: "1:820609175129:web:622e4f246b3cd7c3edab48",
  measurementId: "G-XYSET1RWTJ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Define the authentication providers
const googleProvider = new GoogleAuthProvider();


export { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup ,createUserWithEmailAndPassword,onAuthStateChanged,signOut};
