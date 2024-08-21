import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const fetchProductListingPageFilters = async (appConfig: APP_CONFIG, requestParams: any, token: any) => {
  const additionalParams = { doctype: 'Category', docname: requestParams.query.category }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'get-product-listing-filters-api',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default fetchProductListingPageFilters;
