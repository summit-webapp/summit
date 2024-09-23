import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const getDisplaytagsDataFromAPI = async (appConfig: APP_CONFIG, reqParams: any, currencyValue: any, token: any) => {
  // const displayTagsList = await callGetAPI(`${CONSTANTS.API_BASE_URL}/api/resource/Tag`, token);
  const additionalParams = { fields: JSON.stringify(reqParams) };

  const displayTagsList = await executeGETAPI(undefined, '', token, additionalParams, '/api/resource/Tag');
  if (displayTagsList?.data?.data?.length > 0) {
    const getDisplayTagsProductsList: any = await Promise.all(
      displayTagsList?.data?.data?.length > 0 &&
        displayTagsList?.data?.data.map(async (tag: any) => {
          const additionalParams = {
            tag: tag.name,
            currency: currencyValue,
          };

          const res = await executeGETAPI(appConfig, 'display-tags-api', token, additionalParams);

          return { tag_name: tag.name, description: tag.description, value: res?.data };
        })
    );

    return getDisplayTagsProductsList;
  } else {
    return displayTagsList;
  }
};

export default getDisplaytagsDataFromAPI;
