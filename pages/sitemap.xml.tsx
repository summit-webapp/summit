
import { ISitemapField, getServerSideSitemap, getServerSideSitemapLegacy } from "next-sitemap";
import axios from "axios";
import { CONSTANTS } from "../services/config/app-config";
function generateSiteMap(urlsData: any) {
  console.log("sitemap-urls-data", urlsData);
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
      .join("")}
     </urlset>
   `;
}

function SiteMap() {
  // getServerSideProps will take care of server side rendering
}

export const getServerSideProps = async ({ res }: any) => {
  const method = "get_site_map";
  const entity = "seo";
  const pageTypes = [
    "product-category",
    "product",
    "brand",
    "brand-product",
    "catalog",
    "catalog-product",
  ];
  let responseData: any = [];

  // Define an array of promises for fetching data
  const fetchPromises = pageTypes.map(async (type) => {
    try {
      const response = await axios.get(
        `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${CONSTANTS.VERSION}&method=${method}&entity=${entity}&type=${type}`
      );

      const typeData = response.data.message?.map((item: any) => ({
        loc: `${CONSTANTS.DOMAIN_NAME}${item}`,
        lastmod: new Date().toISOString(),
      }));
      // console.log("sitemap-api", typeData);
      responseData = responseData.concat(typeData);
    } catch (error) {
      console.error(`Error fetching data for type ${type}:`, error);
      // Decide whether to continue or stop on error.
    }
  });

  // Wait for all fetchPromises to complete
  await Promise.all(fetchPromises);

  const fields: ISitemapField[] = responseData.map((item: any) => ({
    loc: `${item.loc}`,
    lastmod: `${item.lastmod}`,
  }));

  console.log("sitemap", fields);
  // return getServerSideSitemap(fields);
  //   // We make an API call to gather the URLs for our site
  //   const request = await fetch(EXTERNAL_DATA_URL);
  //   const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(responseData);
  console.log("sitemap-string", sitemap);

  // return getServerSideSitemapLegacy(ctx, responseData);


  res.setHeader("Content-Type", "text/xml");
  // // we send the XML to the browser
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
};

export default SiteMap;
/*

  getServerSideProps function is to dynamically get the url's from api

*/