import { CONSTANTS } from '../../config/app-config';
import { callGetAPI } from '../../../utils/http-methods';

const fetchProductDetailData = async (product_id: any, currency: any, token: any) => {
  let response: any;
  const version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const method = 'get_details';
  const entity = 'product';

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_API_SDK}?version=${version}&method=${method}&entity=${entity}&item=${product_id}&currency=${currency}`;

  response = await callGetAPI(url, token);
  return response;
};
export default fetchProductDetailData;
