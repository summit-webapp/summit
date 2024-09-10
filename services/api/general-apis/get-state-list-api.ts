import { executeGETAPI } from '../../../utils/http-methods';
import APP_CONFIG from '../../../interfaces/app-config-interface';

const fetchStateListAPI = async (appConfig: APP_CONFIG, token: any) => {
  const additionalParams = {}; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'get-state-list-api',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default fetchStateListAPI;
