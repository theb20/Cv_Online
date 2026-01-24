import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

const SITE_URL = 'https://moncv-dev.web.app';

function extractIds(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const regex = /id:\s*(\d+|['"][^'"]+['"])/g;
    const ids = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      let id = match[1];
      // Remove quotes if present
      if ((id.startsWith('"') && id.endsWith('"')) || (id.startsWith("'") && id.endsWith("'"))) {
        id = id.slice(1, -1);
      }
      ids.push(id);
    }
    return ids;
  } catch (error) {
    console.warn(`Could not read file ${filePath}: ${error.message}`);
    return [];
  }
}

function generateSitemap() {
  console.log('Generating sitemap...');
  const projectIds = extractIds(path.join(DATA_DIR, 'projects.js'));
  const experienceIds = extractIds(path.join(DATA_DIR, 'experiences.js'));

  console.log(`Found ${projectIds.length} projects and ${experienceIds.length} experiences.`);

  const staticRoutes = [
    '',
    '/projects',
    '/experiences',
    '/contact',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes.map(route => `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  ${projectIds.map(id => `
  <url>
    <loc>${SITE_URL}/project/${id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  ${experienceIds.map(id => `
  <url>
    <loc>${SITE_URL}/experience/${id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
  console.log(`Sitemap generated at ${path.join(PUBLIC_DIR, 'sitemap.xml')}`);
}

generateSitemap();
