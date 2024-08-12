import { callGetAPI, fetchDataFromAPI } from '../../../utils/http-methods';
import { CONSTANTS } from '../../config/app-config';

// const getOrderDetailAPI = async (appName: any, token: any, name?: any) => {
//   const user = localStorage.getItem('user');

//   const version = CONSTANTS.CUSTOM_API_SDK_VERSION;
//   const method = 'get_order_detail';
//   const entity = 'order';

//   const params = `?version=${version}&method=${method}&entity=${entity}&name=${name}`;
//   const response: any = await callGetAPI(`${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_SDK}${params}`, token);
//   return response;
// };

// export default getOrderDetailAPI;

const getOrderDetailAPI = async (appName: string, token: any, name: any) => {
  let additionalParams = { ...(name && { name }) }; // Add additional parameters if needed
  // Use fetchDataFromAPI to handle GET Request logic
  const response = await fetchDataFromAPI(
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
