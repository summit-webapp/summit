import { callGetAPI } from '../../../utils/utils';
import { CONSTANTS } from '../../config/app-config';

const getOrderReportAPI = async (token: any, user: any, methods: any) => {
  const version = CONSTANTS.CUSTOM_API_SDK_VERSION;
  const method = methods;
  const entity = 'sales_order_report';
  const params = `?version=${version}&method=${method}&entity=${entity}&user=${user}`;
  const response: any = await callGetAPI(`${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_SDK}${params}`, token);
  return response;
};

export default getOrderReportAPI;
