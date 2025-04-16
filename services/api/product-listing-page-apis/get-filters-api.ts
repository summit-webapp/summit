import APP_CONFIG from '../../../interfaces/app-config-interface';
import { apiEndpointFetcher, executeGETAPI } from '../../../utils/http-methods';

const fetchProductListingPageFilters = async (appConfig: APP_CONFIG, requestParams: any, token: any, appName: any = undefined) => {
  const additionalParams = { doctype: 'Category', docname: requestParams.query.category }; // Add additional parameters if needed

  if (appName) {
    const response = await apiEndpointFetcher(appName, 'get-product-listing-filters-api', undefined, additionalParams, undefined);
    return response;
  }
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
