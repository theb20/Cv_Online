import axios from 'axios';

const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

const CACHE_KEY_PREFIX = 'pagespeed_cache_';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const pageSpeedService = {
  /**
   * Run a Lighthouse audit for a specific URL
   * @param {string} url - The public URL to audit
   * @returns {Promise<Object>} - The scores { performance, accessibility, bestPractices, seo }
   */
  runAudit: async (url) => {
    try {
      // 1. Check Cache
      const cacheKey = `${CACHE_KEY_PREFIX}${url}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        
        // Return cached data if valid (less than 24h)
        if (age < CACHE_DURATION) {
          console.log("Returning cached PageSpeed metrics");
          return data;
        }
      }

      // 2. Build params manually to ensure correct array serialization for Google API
      // (category=PERFORMANCE&category=ACCESSIBILITY...)
      const params = new URLSearchParams();
      params.append('url', url);
      params.append('strategy', 'MOBILE');
      ['PERFORMANCE', 'ACCESSIBILITY', 'BEST_PRACTICES', 'SEO'].forEach(cat => 
        params.append('category', cat)
      );

      const response = await axios.get(`${API_URL}?${params.toString()}`);

      const categories = response.data.lighthouseResult.categories;

      const metrics = {
        performance: Math.round(categories.performance.score * 100),
        accessibility: Math.round(categories.accessibility.score * 100),
        bestPractices: Math.round(categories['best-practices'].score * 100),
        seo: Math.round(categories.seo.score * 100),
        timestamp: new Date().toLocaleDateString()
      };

      // 3. Save to Cache
      localStorage.setItem(cacheKey, JSON.stringify({
        data: metrics,
        timestamp: Date.now()
      }));

      return metrics;
    } catch (error) {
      console.error("PageSpeed API Error:", error);
      
      // If 429 (Quota), try to return old cache even if expired
      if (error.response && error.response.status === 429) {
        const cacheKey = `${CACHE_KEY_PREFIX}${url}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          console.warn("API Quota exceeded, returning expired cache");
          return JSON.parse(cached).data;
        }
      }
      
      throw error;
    }
  }
};

export default pageSpeedService;
