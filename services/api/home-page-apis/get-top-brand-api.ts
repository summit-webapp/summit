import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const getTopBrandAPI = async (appConfig: APP_CONFIG, token: any) => {
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(appConfig, 'brand-list-api', token);

  return response;
};

export default getTopBrandAPI;
