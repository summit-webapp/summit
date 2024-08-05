import { callGetAPI } from '../../../utils/utils';
import { CONSTANTS } from '../../config/app-config';

const getCompletedOrderListAPI = async (token: any) => {
  const user = localStorage.getItem('user');

  const version = CONSTANTS.CUSTOM_API_SDK_VERSION;
  const method = 'get_orders';
  const entity = 'order';
  const params = `?version=${version}&method=${method}&entity=${entity}&user=${user}&status=Completed`;
  const response: any = await callGetAPI(`${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_SDK}${params}`, token);
  return response;
};

export default getCompletedOrderListAPI;
