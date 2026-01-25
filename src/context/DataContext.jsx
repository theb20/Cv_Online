import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as defaultProjects } from '../data/projects';
import { experiences as defaultExperiences } from '../data/experiences';
import { reviews as defaultReviews } from '../constants';
import { googleSheetService } from '../config/Services/googleSheetService';
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    projects: defaultProjects,
    experiences: defaultExperiences,
    reviews: defaultReviews,
    loading: true,
    source: 'local'
  });

  useEffect(() => {
    let unsubscribeFirestore = () => {};

    const initData = async () => {
      // 1. Try to fetch from Google Sheets
      const sheetData = await googleSheetService.fetchAllData();
      
      let currentBaseReviews = defaultReviews;

      if (sheetData && (sheetData.projects || sheetData.experiences)) {
        console.log("Using Google Sheet Data", sheetData);
        currentBaseReviews = sheetData.reviews || defaultReviews;
        
        setData(prev => ({
          ...prev,
          projects: sheetData.projects || prev.projects,
          experiences: sheetData.experiences || prev.experiences,
          reviews: currentBaseReviews, // Will be overwritten by Firestore if available
          source: 'remote',
          loading: false
        }));
      } else {
        // Fallback to local
        setData(prev => ({ ...prev, loading: false }));
      }

      // 2. Real-time listener for Firestore reviews
      // We start this AFTER potential sheet load to have the correct base, 
      // or we just use state. But to be safe and simple:
      const q = query(
        collection(db, "messages"),
        where("type", "==", "review_modal")
        // orderBy("createdAt", "desc") // Commented out to avoid "Missing Index" error if index is not created
      );

      unsubscribeFirestore = onSnapshot(q, (snapshot) => {
        const firestoreReviews = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            name: d.name,
            username: d.role || "Client", // Fallback for subtitle
            body: d.message,
            img: d.photoURL || `https://robohash.org/${d.name}`,
            id: doc.id,
            isVerified: true,
            createdAt: d.createdAt // Keep for sorting
          };
        });

        // Sort client-side to be safe
        firestoreReviews.sort((a, b) => {
             const timeA = a.createdAt?.seconds || 0;
             const timeB = b.createdAt?.seconds || 0;
             return timeB - timeA;
        });

        const baseReviewsWithIds = currentBaseReviews.map((r, i) => ({
             ...r,
             id: r.id || `local-${i}-${r.username}` 
        }));

        setData(prev => ({
          ...prev,
          reviews: [...firestoreReviews, ...baseReviewsWithIds]
        }));
      }, (error) => {
        console.error("Erreur de lecture Firestore (Reviews):", error);
      });
    };

    initData();

    return () => {
        unsubscribeFirestore();
    };
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};
