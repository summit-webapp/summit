import { executeGETAPI } from '../../../utils/http-methods';

const fetchProductListingPageFilters = async (appName: string, request: any) => {
  const additionalParams = { doctype: 'Category', docname: request.query.category }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appName,
    'get-listing-filters-api',
    'get_filters',
    'filter',
    request.token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default fetchProductListingPageFilters;
