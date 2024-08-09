import { callGetAPI } from '../../../utils/http-methods';
import { CONSTANTS } from '../../config/app-config';

export const fetchProductListingPageFilters = async (request: any) => {
  const version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const method = 'get_filters';
  const entity = 'filter';
  const doctype = 'Category';

  // we are passing category in docname variable because in erpnext it checks whether that category is present in docname
  const docname = request.query.category;

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_API_SDK}?version=${version}&method=${method}&entity=${entity}&doctype=${doctype}&docname=${docname}`;

  const response = await callGetAPI(url, request.token);
  return response;
};
