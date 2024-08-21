import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const getOrderReportAPI = async (appConfig: APP_CONFIG, reqParams: any, token: any) => {
  let additionalParams = { ...reqParams };
  const response = await executeGETAPI(
    appConfig,
    'order-reports-api',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default getOrderReportAPI;
