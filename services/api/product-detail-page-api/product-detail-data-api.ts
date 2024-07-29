import { CONSTANTS } from '../../config/app-config';
import { callGetAPI } from '../../../utils/utils';

export const fetchProductDetailData = async (product_id: any, currency: any, token: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = 'get_details';
  const entity = 'product';

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&item=${product_id}&currency=${currency}`;

  response = await callGetAPI(url, token);
  return response;
};
