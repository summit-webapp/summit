import { CONSTANTS } from '../../config/app-config';
import { callGetAPI } from '../../../utils/utils';

 const fetchProductListingFromAPI = async (query: any) => {
  let url: any;
  let page_no: any;
  let limit: any;
  const version = CONSTANTS.VERSION;
  if (CONSTANTS.SHOW_MORE_ITEMS === 'load-more') {
    page_no = query?.url_params?.page;
    limit = 4 * Number(query.url_params.page);
  }
  if (CONSTANTS.SHOW_MORE_ITEMS === 'paginate') {
    page_no = query?.url_params?.page;
    limit = 12;
  }
  const category: any = query.url_params.category;

  const urlParams = Object.keys(query.url_params)
    .map((key) => {
      if (key === 'filter') {
        return `${key}={"${query.filterDoctype}":"${query.filterDocname}", "sections":${query.url_params.filter}}`;
      } else {
        return `${key}=${encodeURIComponent(query.url_params[key])}`;
      }
    })
    .join('&');

  const modifiedParams = urlParams
    .split('&')
    .filter((param) => !param.startsWith('page=') && !param.startsWith('category=') && !param.startsWith('sort_by='))
    .join('&');

  if (query?.url_params?.hasOwnProperty('category')) {
    if (query.router_origin === 'product-category') {
      const method = 'get_list';
      const entity = 'product';
      url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&page_no=${page_no}&limit=${limit}&sort_by=${query.sort_by}&category=${category}&${modifiedParams}`;
    } else if (query.router_origin === 'catalog') {
      const method = 'get_items';
      const entity = 'catalog';
      url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&page_no=${page_no}&limit=${limit}&catalog_slug=${category}`;
    } else if (query.router_origin === 'brand') {
      const method = 'get_list';
      const entity = 'product';
      url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&page_no=${page_no}&limit=${limit}&brand=${category}`;
    }
  } else {
    const method = 'get_list';
    const entity = 'product';
    url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&page_no=${page_no}&limit=${limit}&sort_by=${query.sort_by}&${modifiedParams}`;
  }
  const response = await callGetAPI(url, query.token);
  return response;
};
export default fetchProductListingFromAPI