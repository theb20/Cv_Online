import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as defaultProjects } from '../data/projects';
import { experiences as defaultExperiences } from '../data/experiences';
import { reviews as defaultReviews } from '../constants';
import { googleSheetService } from '../config/Services/googleSheetService';

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
    const initData = async () => {
      // 1. Try to fetch from Google Sheets
      const sheetData = await googleSheetService.fetchAllData();
      
      if (sheetData && (sheetData.projects || sheetData.experiences)) {
        console.log("Using Google Sheet Data", sheetData);
        setData(prev => ({
          ...prev,
          projects: sheetData.projects || prev.projects,
          experiences: sheetData.experiences || prev.experiences,
          reviews: sheetData.reviews || prev.reviews,
          source: 'remote',
          loading: false
        }));
      } else {
        // Fallback to local
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    initData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};
