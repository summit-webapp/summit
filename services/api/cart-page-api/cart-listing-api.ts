import { CONSTANTS } from '../../config/app-config';
import { callGetAPI } from '../../../utils/utils';

const fetchCartListingAPI = async (token: any) => {
  const version = CONSTANTS.CUSTOM_API_SDK_VERSION;
  const method = 'get_list';
  const entity = 'cart';
  const params = `?version=${version}&method=${method}&entity=${entity}`;

  if (Object?.keys(token)?.length > 0) {
    const url: any = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_SDK}${params}`;
    const response = await callGetAPI(url, token);
    return response;
  } else {
    const url: any = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_SDK}${params}`;
    const response = await callGetAPI(url, token);
    return response;
  }
};

export default fetchCartListingAPI;
