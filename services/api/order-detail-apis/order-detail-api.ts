import { executeGETAPI } from '../../../utils/http-methods';
import { CONSTANTS } from '../../config/app-config';

const getOrderDetailAPI = async (appName: string, token: any, name: any) => {
  let additionalParams = { ...(name && { name }) }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appName,
    'order-detail-api',
    'get_order_detail',
    'order',
    token,
    additionalParams // Pass additional parameters if needed
  );
  return response;
};

export default getOrderDetailAPI;
