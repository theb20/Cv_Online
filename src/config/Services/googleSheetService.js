import axios from 'axios';

// Utility to parse CSV text to JSON
const parseCSV = (csvText) => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  
  return lines.slice(1).map(line => {
    // Handle quoted values containing commas
    const values = [];
    let inQuote = false;
    let currentValue = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        values.push(currentValue.trim().replace(/^"|"$/g, ''));
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim().replace(/^"|"$/g, ''));

    return headers.reduce((obj, header, index) => {
      // Try to parse JSON strings (arrays/objects) if possible
      let val = values[index];
      try {
        if (val.startsWith('[') || val.startsWith('{')) {
          val = JSON.parse(val.replace(/""/g, '"')); // Fix double quotes in CSV
        }
      } catch (e) {
        // keep as string
      }
      obj[header] = val;
      return obj;
    }, {});
  }).filter(row => Object.keys(row).length > 1); // Filter empty rows
};

// Map your Google Sheet IDs here (published CSV links)
// You need to "File > Share > Publish to web > Select Sheet > CSV"
const SHEET_CONFIG = {
  projects: "YOUR_PROJECTS_SHEET_CSV_URL", 
  experiences: "YOUR_EXPERIENCES_SHEET_CSV_URL",
  reviews: "YOUR_REVIEWS_SHEET_CSV_URL"
};

export const googleSheetService = {
  fetchAllData: async () => {
    try {
      // Parallel fetch if URLs are provided
      const promises = Object.entries(SHEET_CONFIG).map(async ([key, url]) => {
        if (!url || url.includes("YOUR_")) return [key, null]; // Skip if not configured
        const res = await axios.get(url);
        return [key, parseCSV(res.data)];
      });

      const results = await Promise.all(promises);
      return Object.fromEntries(results);
    } catch (error) {
      console.error("Error fetching Google Sheet data:", error);
      return null;
    }
  }
};
