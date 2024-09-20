import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const getTopCategoryAPI = async (appConfig: APP_CONFIG, token: any) => {
  const response = await executeGETAPI(appConfig, 'top-catagories-api', token);
  return response;
};

export default getTopCategoryAPI;
