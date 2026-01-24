// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx9ZxBVRwLtFBxkdq9qvGQpG2Xw4qXh7w",
  authDomain: "ahobaut-9b48a.firebaseapp.com",
  projectId: "ahobaut-9b48a",
  storageBucket: "ahobaut-9b48a.firebasestorage.app",
  messagingSenderId: "256319459861",
  appId: "1:256319459861:web:b606dc8585ac535266741c",
  measurementId: "G-CZYTHCQ3TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };