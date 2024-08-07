import { callGetAPI } from '../../../utils/utils';
import { CONSTANTS } from '../../config/app-config';

const getPendingOrderReportAPI = async (token: any, user: any) => {
  const version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const method = 'pending_orders_list';
  const entity = 'sales_order_report';
  const params = `?version=${version}&method=${method}&entity=${entity}&user=${user}`;
  const response: any = await callGetAPI(`${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_API_SDK}${params}`, token);
  return response;
};

export default getPendingOrderReportAPI;
