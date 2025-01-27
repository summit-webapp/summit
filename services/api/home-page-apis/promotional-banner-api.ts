import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const promotionalBannerAPI = async (appConfig: APP_CONFIG, reqParams: any, token: any) => {
  const additionalParams = { fields: JSON.stringify(reqParams) };

  const getPromotionalBannerData = await executeGETAPI(undefined, '', token, additionalParams, `/api/resource/Promotional Banner`);
  if (getPromotionalBannerData?.status === 200 && Object.keys(getPromotionalBannerData?.data?.data)?.length > 0) {
    const bannerData = getPromotionalBannerData?.data?.data;
    return bannerData;
  } else {
    return [];
  }
};

export default promotionalBannerAPI;
