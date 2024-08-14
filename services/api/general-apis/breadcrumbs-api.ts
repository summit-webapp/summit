import { fetchDataFromAPI } from '../../../utils/http-methods';

const fetchBreadcrumbsDataFromAPI = async (appName: string, request: any) => {
  const paramURL = [...request.url];
  paramURL.shift();

  let [prodType, category, product] = paramURL;
  const categoryUrl = category;
  const listingCategory = categoryUrl.split('?page')[0];
  product = product?.split('?currency')[0];

  const method = 'breadcrums';
  const entity = 'mega_menu';
  const listingProductType = 'listing';
  const listingBrandType = 'brand';
  const catalogProductType = 'catalog';

  // Initializing additionalParams object
  let additionalParams: Record<string, string> = {};

  if (prodType === 'product-category') {
    additionalParams = {
      method,
      entity,
      product_type: listingProductType,
      ...(category && { category: listingCategory }),
    };
  } else if (prodType === 'product') {
    additionalParams = {
      method,
      entity,
      product_type: listingProductType,
      category: category,
      ...(product && { product }),
    };
  } else if (prodType === 'brand') {
    additionalParams = {
      method,
      entity,
      product_type: listingBrandType,
      brand: listingCategory,
    };
  } else if (prodType === 'brand-product') {
    additionalParams = {
      method,
      entity,
      product_type: listingBrandType,
      brand: listingCategory,
      ...(product && { product }),
    };
  } else if (prodType === 'catalog') {
    additionalParams = {
      method,
      entity,
      product_type: catalogProductType,
      category,
    };
  } else if (prodType === 'catalog-product') {
    additionalParams = {
      method,
      entity,
      product_type: catalogProductType,
      category,
    };
  }

  // Constructing the API call with fetchDataFromAPI
  const response = await fetchDataFromAPI(
    appName,
    'breadcrums-api',
    'breadcrums',
    'mega_menu',
    request?.token,
    additionalParams // Pass additional parameters here
  );

  return response;
};

export default fetchBreadcrumbsDataFromAPI;
