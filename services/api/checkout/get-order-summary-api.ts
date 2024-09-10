import { executeGETAPI } from '../../../utils/http-methods';
import APP_CONFIG from '../../../interfaces/app-config-interface';

const fetchOrderSummaryAPI = async (appConfig: APP_CONFIG, id: string, token: any) => {
  const additionalParams = { id }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'get-order-summary-api',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default fetchOrderSummaryAPI;
