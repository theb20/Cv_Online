import axios from "axios";

const BASE_URL = import.meta.env.VITE_PORTFOLIO_API_URL;

// Back/'s Project rows are camelCase; every existing component in this app
// expects the original static-data shape (snake_case, techno_1..4). Map
// here once so nothing downstream has to change.
function mapProject(p) {
  return {
    id: p.order,
    title: p.title,
    description: p.description,
    image_url: p.imageUrl,
    link_url: p.linkUrl,
    repo_url: p.repoUrl,
    gallery: p.gallery,
    techno_1: p.technologies?.[0],
    techno_2: p.technologies?.[1],
    techno_3: p.technologies?.[2],
    techno_4: p.technologies?.[3],
    version: p.version,
    category: p.category,
    rating: p.rating,
    reviews: p.reviews,
    type: p.type,
    status: p.status,
    features: p.features,
    architecture: p.architecture,
    metrics: p.metrics,
    context: p.context,
    team_text: p.teamText,
    security_text: p.securityText,
    performance_text: p.performanceText,
    problem: p.problem,
    solution: p.solution,
    impact: p.impact,
    timeline: p.timeline,
    team_size: p.teamSize,
    client_type: p.clientType,
    highlights: p.highlights,
    challenges: p.challenges,
    downloadFiles: p.downloadFiles ?? undefined,
    slug: p.slug,
  };
}

function mapExperience(e) {
  return {
    id: e.order,
    company: e.company,
    position: e.position,
    type: e.type,
    country: e.country,
    location: e.location,
    start_date_formatted: e.startDateFormatted,
    end_date_formatted: e.endDateFormatted,
    duration: e.duration,
    description: e.description,
    missions: e.missions,
    highlights: e.highlights,
    technologies: e.technologies,
    stats: e.stats,
    image: e.image,
    color: e.color,
  };
}

export const portfolioApiService = {
  async fetchAllData() {
    if (!BASE_URL) return null;
    try {
      const [projectsRes, experiencesRes] = await Promise.all([
        axios.get(`${BASE_URL}/projects/public`),
        axios.get(`${BASE_URL}/experiences`),
      ]);

      return {
        projects: projectsRes.data.map(mapProject),
        experiences: experiencesRes.data.map(mapExperience),
      };
    } catch (error) {
      console.error("Error fetching portfolio API data:", error);
      return null;
    }
  },
};
