import { executeGETAPI } from '../../../utils/http-methods';
import APP_CONFIG from '../../../interfaces/app-config-interface';

const fetchCitiesListAPI = async (appConfig: APP_CONFIG, stateName: string, token: any) => {
  const additionalParams = { state: stateName }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'get-cities-list-api',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default fetchCitiesListAPI;
