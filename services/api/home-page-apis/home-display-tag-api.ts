import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const getDisplaytagsDataFromAPI = async (
  appConfig: APP_CONFIG,
  reqParams: any,
  collection_name: string,
  currencyValue: any,
  token: any
) => {
  // const displayTagsList = await callGetAPI(`${CONSTANTS.API_BASE_URL}/api/resource/Tag`, token);
  const additionalParams = { fields: JSON.stringify(reqParams) };

  const getFeaturedCollectionData = await executeGETAPI(undefined, '', token, additionalParams, `/api/resource/Tag/${collection_name}`);

  if (getFeaturedCollectionData?.status === 200 && Object.keys(getFeaturedCollectionData?.data?.data)?.length > 0) {
    const additionalParams = {
      tag: getFeaturedCollectionData?.data?.data?.name,
      currency: currencyValue,
    };
    const res = await executeGETAPI(appConfig, 'display-tags-api', token, additionalParams);
    const tagData = [
      {
        tag_name: getFeaturedCollectionData?.data?.data?.name,
        description: getFeaturedCollectionData?.data?.data?.description,
        value: res?.data,
        tag_image: getFeaturedCollectionData?.data?.data?.tag_image,
      },
    ];
    return tagData;
  } else {
    return [];
  }
};

export default getDisplaytagsDataFromAPI;
