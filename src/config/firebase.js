// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkynw7ki_q3ZrAujb7XmhjoRbP6UBL4Jg",
  authDomain: "moncv-dev.firebaseapp.com",
  projectId: "moncv-dev",
  storageBucket: "moncv-dev.firebasestorage.app",
  messagingSenderId: "642098738277",
  appId: "1:642098738277:web:65989f33172f8e17edc28c",
  measurementId: "G-F7ZZH7GSRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, analytics, auth, googleProvider, db };