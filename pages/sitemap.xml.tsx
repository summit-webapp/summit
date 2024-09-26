import { ISitemapField } from 'next-sitemap';
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
  const pageTypes = ['brand', 'brand-product', 'catalog', 'catalog-product'];
  let responseData: any = [];

  // Define an array of promises for fetching data
  const fetchPromises = pageTypes.map(async (type) => {
    try {
      const response = await axios.get(
        `${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_APP_CONFIG.app_name}?version=${CONSTANTS.SUMMIT_APP_CONFIG.version}&method=${method}&entity=${entity}&type=${type}`
      );

      const typeData = response.data.message?.map((item: any) => ({
        loc: `${CONSTANTS.FRONTEND_URL}${item}`,
        lastmod: new Date().toISOString(),
      }));
      responseData = responseData.concat(typeData);
    } catch (error) {
      console.error(`Error fetching data for type ${type}:`, error);
    }
  });

  // Wait for all fetchPromises to complete
  await Promise.all(fetchPromises);

  const fields: ISitemapField[] = responseData.map((item: any) => ({
    loc: `${item.loc}`,
    lastmod: `${item.lastmod}`,
  }));
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
