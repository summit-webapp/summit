import { callGetAPI } from '../../../utils/utils';
import { CONSTANTS } from '../../config/app-config';

const getOrderDetailAPI = async (token: any, name?: any) => {
  const user = localStorage.getItem('user');

  const version = CONSTANTS.CUSTOM_API_SDK_VERSION;
  const method = 'get_order_detail';
  const entity = 'order';

  const params = `?version=${version}&method=${method}&entity=${entity}&name=${name}`;
  const response: any = await callGetAPI(`${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_SDK}${params}`, token);
  return response;
};

export default getOrderDetailAPI;
