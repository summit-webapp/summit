import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

/**
 * Fetches User Details from the API using the given parameters.
 *
 * @async
 * @function getUserDetailsAPI
 * @param {string} appConfig - The configuration of the application.
 * @param {string} token - The authentication token.
 * @returns {Promise<any>} - The response from the API call.
 * @throws {Error} Throws an error if the API call fails.
 */
const getUserDetailsAPI = async (appConfig: APP_CONFIG, token: any): Promise<any> => {
  let additionalParams = {};
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'get-user-details-api',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default getUserDetailsAPI;
