// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkynw7ki_q3ZrAujb7XmhjoRbP6UBL4Jg",
  authDomain: "moncv-dev.firebaseapp.com",
  projectId: "moncv-dev",
  storageBucket: "moncv-dev.firebasestorage.app",
  messagingSenderId: "642098738277",
  appId: "1:642098738277:web:8a8dd7b278afe887edc28c",
  measurementId: "G-DSG8X57G6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
