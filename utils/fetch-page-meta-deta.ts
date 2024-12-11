import { CONSTANTS } from '../services/config/app-config';
import MetaTagAPI from '../services/api/general-apis/meta-tag-api';

const getPageMetaData = async (params: string, url: string) => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  let serverDataForPages: any = {};

  // Below API call will return Meta Data for Pages.
  let metaDataFromAPI: any = await MetaTagAPI(`${CONSTANTS.API_BASE_URL}${SUMMIT_APP_CONFIG.app_name}${params}&page_name=${url}`);
  if (metaDataFromAPI?.status === 200 && metaDataFromAPI?.data?.message?.msg === 'success') {
    serverDataForPages.metaData = metaDataFromAPI?.data?.message?.data;
  } else {
    serverDataForPages.metaData = {};
  }
  return {
    props: { serverDataForPages },
  };
};

export default getPageMetaData;
