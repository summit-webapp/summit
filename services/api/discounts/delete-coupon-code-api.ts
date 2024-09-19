import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeDELETEAPI } from '../../../utils/http-methods';

const DeleteCouponAPI: any = async (appConfig: APP_CONFIG, apiBody: any, token: any) => {
  const response = await executeDELETEAPI(appConfig, 'delete-coupon-code-api', apiBody, token);
  return response;
};

export default DeleteCouponAPI;
