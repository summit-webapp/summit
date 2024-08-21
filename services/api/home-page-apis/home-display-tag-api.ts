import APP_CONFIG from '../../../interfaces/app-config-interface';
import { callGetAPI, executeGETAPI } from '../../../utils/http-methods';
import { CONSTANTS } from '../../config/app-config';

const getDisplaytagsDataFromAPI = async (appConfig: APP_CONFIG, currencyValue: any, token: any) => {
  // const displayTagsList = await callGetAPI(`${CONSTANTS.API_BASE_URL}/api/resource/Tag`, token);

  const displayTagsList = await executeGETAPI(undefined, '', token, {}, '/api/resource/Tag');
  if (displayTagsList?.data?.data?.length > 0) {
    const getDisplayTagsProductsList: any = await Promise.all(
      displayTagsList?.data?.data?.length > 0 &&
        displayTagsList?.data?.data.map(async (tag: any) => {
          const additionalParams = {
            tag: tag.name,
            currency: currencyValue,
          };

          const res = await executeGETAPI(appConfig, 'display-tags-api', token, additionalParams);

          return { tag_name: tag.name, value: res?.data };
        })
    );

    return getDisplayTagsProductsList;
  } else {
    return displayTagsList;
  }
};

export default getDisplaytagsDataFromAPI;
