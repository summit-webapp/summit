import { callGetAPI, fetchDataFromAPI } from '../../../utils/http-methods';
import { CONSTANTS } from '../../config/app-config';

const getDisplaytagsDataFromAPI = async (appName: any, token: any, currencyValue: any) => {
  const displayTagsList = await callGetAPI(`${CONSTANTS.API_BASE_URL}/api/resource/Tag`, token);

  if (displayTagsList?.data?.data?.length > 0) {
    const getDisplayTagsProductsList: any = await Promise.all(
      displayTagsList?.data?.data?.length > 0 &&
        displayTagsList?.data?.data.map(async (tag: any) => {
          const additionalParams = {
            tag: tag.name,
            currency: currencyValue,
          };

          const res = await fetchDataFromAPI(appName, 'display-tags-api', 'get_tagged_products', 'product', token, additionalParams);

          return { tag_name: tag.name, value: res?.data };
        })
    );

    return getDisplayTagsProductsList;
  } else {
    return displayTagsList;
  }
};

export default getDisplaytagsDataFromAPI;
