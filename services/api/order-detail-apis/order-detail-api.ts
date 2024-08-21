import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const getOrderDetailAPI = async (appConfig: APP_CONFIG, name: any, token: any) => {
  let additionalParams = { ...(name && { name }) }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'order-detail-api',
    token,
    additionalParams // Pass additional parameters if needed
  );
  return response;
};

export default getOrderDetailAPI;
