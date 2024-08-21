import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const fetchProductDetailData = async (appConfig: APP_CONFIG, requestParams: any, token: any) => {
  const additionalParams = { ...requestParams }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'product-detail-api',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default fetchProductDetailData;
