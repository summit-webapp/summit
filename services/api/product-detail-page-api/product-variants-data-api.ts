import { CONSTANTS } from '../../config/app-config';
import { callGetAPI } from '../../../utils/utils';

export const fetchProductVariant = async (product_id: any, token: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = 'get_variants';
  const entity = 'variant';

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&item=${product_id}`;

  response = await callGetAPI(url, token);
  return response;
};
