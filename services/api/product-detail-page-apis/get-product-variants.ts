import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const fetchProductVariant = async (appConfig: APP_CONFIG, product_id: any, token: any) => {
  const additionalParams = { item: product_id }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'product-variants-api',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default fetchProductVariant;
