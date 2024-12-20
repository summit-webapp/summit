import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const getSiteMapList = async (pageType: any, appConfig: APP_CONFIG) => {
  const additionalParams = { ...pageType }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'sitemap-api',
    undefined,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default getSiteMapList;
