import { executeGETAPI } from '../../../utils/http-methods';

const fetchProductDetailData = async (appName: string, product_id: any, currency: any, token: any) => {
  const additionalParams = { item: product_id, currency: currency }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appName,
    'product-detail-api',
    'get_details',
    'product',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default fetchProductDetailData;
