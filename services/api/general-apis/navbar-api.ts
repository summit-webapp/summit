import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const getNavbarDataFromAPI = async (appConfig: APP_CONFIG, token: any) => {
  const additionalParams = {}; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'navbar-api',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default getNavbarDataFromAPI;
