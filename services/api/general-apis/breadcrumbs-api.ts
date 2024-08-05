import { CONSTANTS } from '../../config/app-config';
import { callGetAPI } from '../../../utils/utils';

const getBreadcrumbsDataFromAPI = async (request: any) => {
  const paramURL = [...request.url];
  paramURL.shift();

  let [prodType, category, product] = paramURL;
  const categoryUrl = category;
  const listingCategory = categoryUrl.split('?page')[0];
  product = product?.split('?currency')[0];

  const version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const method = 'breadcrums';
  const entity = 'mega_menu';
  const listingProductType = 'listing';
  const listingBrandType = 'brand';
  const catalogProductType = 'catalog';
  let params: string = '';

  if (prodType === 'product-category') {
    if (prodType && category) {
      params = `&method=${method}&entity=${entity}&product_type=${listingProductType}&category=${listingCategory}`;
    } else {
      params = `&method=${method}&entity=${entity}&product_type=${listingProductType}`;
    }
  } else if (prodType === 'product') {
    if (product) {
      params = `&method=${method}&entity=${entity}&product_type=${listingProductType}&category=${category}&product=${product}`;
    } else {
      params = `&method=${method}&entity=${entity}&product_type=${listingProductType}&product=${category}`;
    }
  } else if (prodType === 'brand') {
    params = `&method=${method}&entity=${entity}&product_type=${listingBrandType}&brand=${listingCategory}`;
  } else if (prodType === 'brand-product') {
    params = `&method=${method}&entity=${entity}&product_type=${listingBrandType}&brand=${listingCategory}&product=${product}`;
  } else if (prodType === 'catalog') {
    params = `&method=${method}&entity=${entity}&product_type=${catalogProductType}&category=${category}`;
  } else if (prodType === 'catalog-product') {
    params = `&method=${method}&entity=${entity}&product_type=${catalogProductType}&category=${category}`;
  }

  const response = await callGetAPI(`${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_API_SDK}?version=${version}${params}`, request?.token);
  return response;
};

export default getBreadcrumbsDataFromAPI;
