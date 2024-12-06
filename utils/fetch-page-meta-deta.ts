import MetaTagAPI from '../services/api/general-apis/meta-tag-api';
import { CONSTANTS } from '../services/config/app-config';

const getPageMetaData = async (params: string, url: string) => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  let metaDataFromAPI: any = await MetaTagAPI(`${CONSTANTS.API_BASE_URL}${SUMMIT_APP_CONFIG.app_name}${params}&page_name=${url}`);
  if (
    metaDataFromAPI?.status === 200 &&
    metaDataFromAPI?.data?.message?.msg === 'success' &&
    metaDataFromAPI?.data?.message?.data !== 'null'
  ) {
    const metaData = metaDataFromAPI?.data?.message?.data;
    return {
      props: { metaData },
    };
  } else {
    return { props: {} };
  }
};

export default getPageMetaData;
