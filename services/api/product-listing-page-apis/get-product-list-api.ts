import { CONSTANTS } from '../../config/app-config';
import { executeGETAPI } from '../../../utils/http-methods';

const fetchProductListingFromAPI = async (appName: any, query: any, token: any) => {
  let response: any;
  let page_no: number | undefined;
  let limit: number | undefined;

  // Determine the page number and limit based on the pagination method
  if (CONSTANTS.SHOW_MORE_ITEMS === 'load-more') {
    page_no = query?.url_params?.page;
    limit = CONSTANTS.PRODUCT_COUNT_ON_PRODUCT_CATEGORY_PAGE * Number(query.url_params.page);
  } else if (CONSTANTS.SHOW_MORE_ITEMS === 'paginate') {
    page_no = query?.url_params?.page;
    limit = CONSTANTS.PRODUCT_COUNT_ON_PRODUCT_CATEGORY_PAGE;
  }

  const category: any = query.url_params.category;

  // Construct URL parameters
  const urlParams = Object.keys(query.url_params)
    .map((key) => {
      if (key === 'filter') {
        return `${key}={"${query.filterDoctype}":"${query.filterDocname}", "sections":${query.url_params.filter}}`;
      } else {
        return `${key}=${encodeURIComponent(query.url_params[key])}`;
      }
    })
    .join('&');

  // Filter out unwanted parameters
  const modifiedParams = urlParams
    .split('&')
    .filter((param) => !param.startsWith('page=') && !param.startsWith('category=') && !param.startsWith('sort_by='))
    .join('&');

  // Initialize the additionalParams object
  let additionalParams: Record<string, any> = {
    page_no,
    limit,
    ...(query.sort_by && { sort_by: query.sort_by }),
    ...modifiedParams.split('&').reduce(
      (acc, param) => {
        const [key, value] = param.split('=');
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    ),
  };

  if (query.router_origin === 'product-category') {
    additionalParams = {
      ...additionalParams,
      category,
    };
    response = await executeGETAPI(appName, 'product-list-api', token, additionalParams);
  } else if (query.router_origin === 'catalog') {
    additionalParams = {
      ...additionalParams,
      catalog_slug: category,
    };
    response = await executeGETAPI(appName, 'catalog-product-list-api', token, additionalParams);
  } else if (query.router_origin === 'brand') {
    additionalParams = {
      ...additionalParams,
      brand: category,
    };
    response = await executeGETAPI(appName, 'brand-product-list-api', token, additionalParams);
  }

  return response;
};

export default fetchProductListingFromAPI;
