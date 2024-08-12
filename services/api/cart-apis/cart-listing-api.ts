import { CONSTANTS } from '../../config/app-config';
import { callGetAPI, fetchDataFromAPI } from '../../../utils/http-methods';

// const fetchCartListingAPI = async (token: any) => {
//   const version = CONSTANTS.CUSTOM_API_SDK_VERSION;
//   const method = 'get_list';
//   const entity = 'cart';
//   const params = `?version=${version}&method=${method}&entity=${entity}`;
//   const url: any = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_SDK}${params}`;
//   const response = await callGetAPI(url, token);
//   return response;
// };
// export default fetchCartListingAPI;

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
