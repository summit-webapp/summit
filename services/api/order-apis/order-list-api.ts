import { executeGETAPI } from '../../../utils/http-methods';

/**
 * Fetches Order History data from the API using the given parameters.
 *
 * @async
 * @function getOrderListAPI
 * @param {string} appName - The name of the application.
 * @param {string} token - The authentication token.
 * @param {string} [status] - Optional status filter for the order listing.
 * @returns {Promise<any>} - The response from the API call.
 * @throws {Error} Throws an error if the API call fails.
 */
const getOrderListAPI = async (appName: string, token: any, status?: string): Promise<any> => {
  const user = localStorage.getItem('user') || '';
  let additionalParams = { user, ...(status && { status }) };
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appName,
    'order-list-api',
    'get_orders',
    'order',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default getOrderListAPI;
