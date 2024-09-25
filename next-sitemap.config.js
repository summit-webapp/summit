import { CONSTANTS } from './services/config/app-config';

// const siteUrl = `${CONSTANTS.DOMAIN_NAME}`;
const siteUrl = `${CONSTANTS.API_BASE_URL}`;

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/sitemap.xml`, `${siteUrl}/server-sitemap.xml`],
  },
};
