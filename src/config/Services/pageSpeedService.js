import axios from 'axios';

const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

const pageSpeedService = {
  /**
   * Run a Lighthouse audit for a specific URL
   * @param {string} url - The public URL to audit
   * @returns {Promise<Object>} - The scores { performance, accessibility, bestPractices, seo }
   */
  runAudit: async (url) => {
    try {
      // We request all 4 categories
      const response = await axios.get(API_URL, {
        params: {
          url: url,
          category: ['PERFORMANCE', 'ACCESSIBILITY', 'BEST_PRACTICES', 'SEO'],
          strategy: 'MOBILE' // 'DESKTOP' is another option
        }
      });

      const categories = response.data.lighthouseResult.categories;

      return {
        performance: Math.round(categories.performance.score * 100),
        accessibility: Math.round(categories.accessibility.score * 100),
        bestPractices: Math.round(categories['best-practices'].score * 100),
        seo: Math.round(categories.seo.score * 100),
        timestamp: new Date().toLocaleDateString()
      };
    } catch (error) {
      console.error("PageSpeed API Error:", error);
      throw error;
    }
  }
};

export default pageSpeedService;
