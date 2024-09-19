import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executePOSTAPI } from '../../../utils/http-methods';

const PostApplyCouponAPI: any = async (appConfig: APP_CONFIG, apiBody: any, token?: any) => {
  const response = await executePOSTAPI(appConfig, 'apply-coupon-code-api', apiBody, token);
  return response;
};

export default PostApplyCouponAPI;
