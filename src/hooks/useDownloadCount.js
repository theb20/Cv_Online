import { useState, useEffect } from "react";
import { db } from "../config/firebase.js";
import { doc, onSnapshot, setDoc, increment } from "firebase/firestore";

export const useDownloadCount = (bookId, user) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!bookId) return;
    const ref = doc(db, "livres", bookId);
    return onSnapshot(ref, (snap) => {
      setCount(snap.exists() ? snap.data().downloads || 0 : 0);
    }, () => {});
  }, [bookId]);

  // Retourne true si le téléchargement peut se poursuivre, false si non connecté
  const registerDownload = async () => {
    if (!user) return false;
    if (!bookId) return true;
    const ref = doc(db, "livres", bookId);
    try {
      await setDoc(ref, { downloads: increment(1) }, { merge: true });
    } catch {
      // ignore: e.g. Firestore rules reject the write, download still proceeds
    }
    return true;
  };

  return { count, registerDownload };
};
