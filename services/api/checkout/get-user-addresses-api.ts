import { executeGETAPI } from '../../../utils/http-methods';
import APP_CONFIG from '../../../interfaces/app-config-interface';

const fetchUserAddressAPI = async (appConfig: APP_CONFIG, address_type: string, token: any) => {
  const additionalParams = { type: address_type }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'get-user-addresses-api',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default fetchUserAddressAPI;
