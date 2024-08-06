import { callGetAPI } from '../../../utils/utils';
import { CONSTANTS } from '../../config/app-config';

const getOrderListAPI = async (token: any, status?: any) => {
  const user = localStorage.getItem('user');

  const version = CONSTANTS.CUSTOM_API_SDK_VERSION;
  const method = 'get_orders';
  const entity = 'order';

  const params = `?version=${version}&method=${method}&entity=${entity}&user=${user}${status !== undefined ? `&status=${status}` : ''}`;
  const response: any = await callGetAPI(`${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_SDK}${params}`, token);
  return response;
};

export default getOrderListAPI;
