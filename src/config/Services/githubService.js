import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com/repos';

const githubService = {
  /**
   * Fetch repository details, commits, and languages
   * @param {string} repoString - "owner/repo" format
   */
  getRepoData: async (repoString) => {
    if (!repoString) return null;
    
    try {
      // Parallel requests for efficiency
      const [repoRes, commitsRes, languagesRes, pullsRes] = await Promise.all([
        axios.get(`${GITHUB_API_BASE}/${repoString}`),
        axios.get(`${GITHUB_API_BASE}/${repoString}/commits?per_page=5`),
        axios.get(`${GITHUB_API_BASE}/${repoString}/languages`),
        axios.get(`${GITHUB_API_BASE}/${repoString}/pulls?state=closed&per_page=1`) // Just to get count from header or simple list
      ]);

      return {
        details: repoRes.data,
        lastCommit: commitsRes.data[0],
        commits: commitsRes.data,
        languages: languagesRes.data,
        // For PR count, GitHub API doesn't give total directly in list response without pagination links
        // But we can use the open_issues_count from repo details as a proxy for activity or just show what we have
        // Actually, we can just return the raw data and process in component
      };
    } catch (error) {
      console.error("GitHub API Error:", error);
      return null;
    }
  }
};

export default githubService;
