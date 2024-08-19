import { CONSTANTS } from '../../config/app-config';
import { callGetAPI, executeGETAPI } from '../../../utils/http-methods';

const fetchCartListingAPI = async (appName: string, token: any) => {
  const additionalParams = {}; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appName,
    'cart-list-api',
    'get_list',
    'cart',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default fetchCartListingAPI;
