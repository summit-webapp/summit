
import {  fetchDataFromAPI } from '../../../utils/http-methods';
import { CONSTANTS } from '../../config/app-config';

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
