import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const fetchBreadcrumbsDataFromAPI = async (appConfig: APP_CONFIG, request: any, token: any) => {
  const paramURL = [...request.url];
  paramURL.shift();

  let [prodType, category, product] = paramURL;
  const categoryUrl = category;
  const listingCategory = categoryUrl.split('?page')[0];
  product = product?.split('?currency')[0];
  const listingProductType = 'listing';
  const listingBrandType = 'brand';
  const catalogProductType = 'catalog';

  // Initializing additionalParams object
  let additionalParams: Record<string, string> = {};

  if (prodType === 'product-category') {
    additionalParams = {
      product_type: listingProductType,
      ...(category && { category: listingCategory }),
    };
  } else if (prodType === 'product') {
    additionalParams = {
      product_type: listingProductType,
      category: category,
      ...(product && { product }),
    };
  } else if (prodType === 'brand') {
    additionalParams = {
      product_type: listingBrandType,
      brand: listingCategory,
    };
  } else if (prodType === 'brand-product') {
    additionalParams = {
      product_type: listingBrandType,
      brand: listingCategory,
      ...(product && { product }),
    };
  } else if (prodType === 'catalog') {
    additionalParams = {
      product_type: catalogProductType,
      category,
    };
  } else if (prodType === 'catalog-product') {
    additionalParams = {
      product_type: catalogProductType,
      category,
    };
  }

  // Constructing the API call with executeGETAPI
  const response = await executeGETAPI(
    appConfig,
    'breadcrums-api',
    token,
    additionalParams // Pass additional parameters here
  );

  return response;
};

export default fetchBreadcrumbsDataFromAPI;
