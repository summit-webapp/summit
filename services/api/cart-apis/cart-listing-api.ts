import { CONSTANTS } from '../../config/app-config';
import { callGetAPI, fetchDataFromAPI } from '../../../utils/http-methods';

const fetchCartListingAPI = async (appName: string, token: any) => {
  const additionalParams = {}; // Add additional parameters if needed
  // Use fetchDataFromAPI to handle GET Request logic
  const response = await fetchDataFromAPI(
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
