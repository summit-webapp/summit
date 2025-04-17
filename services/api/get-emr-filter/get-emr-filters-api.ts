import APP_CONFIG from '../../../interfaces/app-config-interface';
import { apiEndpointFetcher, executeGETAPI } from '../../../utils/http-methods';

const fetchProductListingPageFilters = async (appConfig: APP_CONFIG, requestParams: any, token: any, appName: any = undefined) => {
  const additionalParams = { doctype: 'Category', docname: requestParams.query.category, anaSr: JSON.stringify(requestParams?.anaSr) }; // Add additional parameters if needed

  if (appName) {
    const response = await apiEndpointFetcher(appName, 'get-product-listing-filters-api', undefined, additionalParams, undefined);
    return response;
  }
};

export default fetchProductListingPageFilters;
