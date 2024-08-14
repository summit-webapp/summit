import { fetchDataFromAPI } from '../../../utils/http-methods';

const fetchProductVariant = async (appName: string, product_id: any, token: any) => {
  const additionalParams = { item: product_id }; // Add additional parameters if needed
  // Use fetchDataFromAPI to handle GET Request logic
  const response = await fetchDataFromAPI(
    appName,
    'product-variants-api',
    'get_variants',
    'variant',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default fetchProductVariant;
