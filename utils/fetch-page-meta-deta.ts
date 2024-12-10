import MetaTagAPI from '../services/api/general-apis/meta-tag-api';
import MultiLangApi from '../services/api/general-apis/multilanguage-api';
import { CONSTANTS } from '../services/config/app-config';

const getPageMetaData = async (params: string, url: string) => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  let serverDataForPages: any = {};
  const MultilanguageData = await MultiLangApi(SUMMIT_APP_CONFIG);
  if (MultilanguageData?.length > 0) {
    serverDataForPages.multiLingualListTranslationTextList = MultilanguageData;
  } else {
    serverDataForPages.multiLingualListTranslationTextList = [];
  }
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
