import { CONSTANTS } from "./services/config/app-config";

// const siteUrl = `${CONSTANTS.DOMAIN_NAME}`;
const siteUrl = `https://summit-b2b-demo.8848digital.com`;

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap.xml`,
    ],
  },
};
