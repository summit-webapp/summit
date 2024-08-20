import { callGetAPI, executeGETAPI } from '../../../utils/http-methods';
import { CONSTANTS } from '../../config/app-config';

const getOrderReportAPI = async (appName: string, token: any, user: any, methods: any) => {
  let additionalParams = { user };
  const response = await executeGETAPI(
    appName,
    'order-reports-api',
    methods,
    'sales_order_report',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default getOrderReportAPI;
