import MetaTagAPI from '../services/api/general-apis/meta-tag-api';
import MultiLangApi from '../services/api/general-apis/multilanguage-api';
import getHomePageComponentsList from '../services/api/home-page-apis/get-home-page-components';
import { CONSTANTS } from '../services/config/app-config';

const getPageMetaData = async (params: string, url: string) => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  let serverDataForPages: any = {};

  // Below API call will return you static text's. Those static text's would get changed on language change from dropdown present in UI.
  const MultilanguageData = await MultiLangApi(SUMMIT_APP_CONFIG);
  if (MultilanguageData?.length > 0) {
    serverDataForPages.multiLingualListTranslationTextList = MultilanguageData;
  } else {
    serverDataForPages.multiLingualListTranslationTextList = [];
  }

  // Below API call will return Meta Data for Pages.
  let metaDataFromAPI: any = await MetaTagAPI(`${CONSTANTS.API_BASE_URL}${SUMMIT_APP_CONFIG.app_name}${params}&page_name=${url}`);
  if (metaDataFromAPI?.status === 200 && metaDataFromAPI?.data?.message?.msg === 'success') {
    serverDataForPages.metaData = metaDataFromAPI?.data?.message?.data;
  } else {
    serverDataForPages.metaData = {};
  }

  // Below API call with return you list of components that can be used across pages for painting the pages.
  let fetchComponentsList: any = await getHomePageComponentsList(SUMMIT_APP_CONFIG);
  if (
    fetchComponentsList?.status === 200 &&
    fetchComponentsList?.data?.message?.msg === 'success' &&
    fetchComponentsList?.data?.message?.data?.length > 0
  ) {
    serverDataForPages.componentsList = fetchComponentsList?.data?.message?.data;
  } else {
    serverDataForPages.componentsList = [];
  }
  return {
    props: { serverDataForPages },
  };
};

export default getPageMetaData;
