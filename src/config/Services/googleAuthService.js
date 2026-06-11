import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
