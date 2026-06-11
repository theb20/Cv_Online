import { useState, useEffect } from "react";
import { db } from "../config/firebase.js";
import {
  collection, doc, setDoc, deleteDoc,
  onSnapshot, serverTimestamp
} from "firebase/firestore";

// ─── Like ─────────────────────────────────────────────────────────────────────
export const useLike = (projectId, user) => {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    const ref = collection(db, "projects", String(projectId), "likes");
    return onSnapshot(ref, (snap) => {
      setCount(snap.size);
      setLiked(user ? snap.docs.some(d => d.id === user.uid) : false);
    }, () => {});
  }, [projectId, user?.uid]);

  // Retourne true si ok, false si non connecté
  const toggle = async () => {
    if (!user) return false;
    const ref = doc(db, "projects", String(projectId), "likes", user.uid);
    liked
      ? await deleteDoc(ref)
      : await setDoc(ref, { uid: user.uid, createdAt: serverTimestamp() });
    return true;
  };

  return { count, liked, toggle };
};

// ─── Rating ───────────────────────────────────────────────────────────────────
export const useRating = (projectId, user) => {
  const [ratings,    setRatings]    = useState([]);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    if (!projectId) return;
    const ref = collection(db, "projects", String(projectId), "ratings");
    return onSnapshot(ref, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setRatings(data);
      const mine = user ? data.find(d => d.id === user.uid) : null;
      setUserRating(mine?.rating ?? 0);
    }, () => {});
  }, [projectId, user?.uid]);

  const average = ratings.length
    ? +(ratings.reduce((s, r) => s + r.rating, 0) / ratings.length).toFixed(1)
    : 0;

  // Retourne true si ok, false si non connecté
  const rate = async (value) => {
    if (!user) return false;
    const ref = doc(db, "projects", String(projectId), "ratings", user.uid);
    await setDoc(ref, { uid: user.uid, rating: value, createdAt: serverTimestamp() });
    return true;
  };

  return { average, count: ratings.length, userRating, rate };
};
