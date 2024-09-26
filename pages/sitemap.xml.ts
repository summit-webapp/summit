import fs from 'fs';
import axios from 'axios';
import { CONSTANTS } from '../services/config/app-config';
function generateSiteMap(urlsData: any) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
       ${urlsData
         .map((url: any) => {
           return `
         <url>
             <loc>${url.loc}</loc>
             <lastmod>${url.lastmod}</lastmod>
         </url>
       `;
         })
         .join('')}
     </urlset>
   `;
}

function SiteMap() {
  // getServerSideProps will take care of server side rendering
}

export const getServerSideProps = async ({ res }: any) => {
  const method = 'get_site_map';
  const entity = 'seo';
  const pageTypes = ['product-category', 'product', 'brand', 'brand-product', 'catalog', 'catalog-product'];
  let responseData: any = [];

  const staticPages = fs
    .readdirSync('pages')
    .filter((staticPage) => {
      return !['_app.tsx', '_document.tsx', 'sitemap.xml.ts'].includes(staticPage);
    })
    .map((staticPagePath) => ({
      loc: `${CONSTANTS.FRONTEND_URL}/${staticPagePath}`,
      lastmod: new Date().toISOString(),
    }));
  responseData = responseData.concat(staticPages);

  // Define an array of promises for fetching data
  const fetchPromises = pageTypes.map(async (type) => {
    try {
      const response = await axios.get(
        `${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_APP_CONFIG.app_name}?version=${CONSTANTS.SUMMIT_APP_CONFIG.version}&method=${method}&entity=${entity}&type=${type}`
      );

      if (response.status === 200 && response.data.message?.msg === 'success' && response.data.message?.data?.length > 0) {
        const typeData = response.data.message?.data?.map((item: any) => ({
          loc: `${CONSTANTS.FRONTEND_URL}/${item}`,
          lastmod: new Date().toISOString(),
        }));
        responseData = responseData.concat(typeData);
      }
    } catch (error) {
      console.error(`Error fetching data for type ${type}:`, error);
    }
  });

  // Wait for all fetchPromises to complete
  await Promise.all(fetchPromises);
  const sitemap = generateSiteMap(responseData);

  res.setHeader('Content-Type', 'text/xml');
  // Send the XML to the browser
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
};

export default SiteMap;
