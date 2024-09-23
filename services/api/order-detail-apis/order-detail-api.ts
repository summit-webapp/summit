import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const getOrderDetailAPI = async (appConfig: APP_CONFIG, orderId: any, token: any) => {
  let additionalParams = { ...(orderId && { order_id: orderId }) }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'order-list-api',
    token,
    additionalParams // Pass additional parameters if needed
  );
  return response;
};

export default getOrderDetailAPI;
