import { callGetAPI } from '../../../utils/http-methods';
import { CONSTANTS } from '../../config/app-config';

const getDisplaytagsDataFromAPI = async (token: any, currencyValue: any) => {
  const version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const method = 'get_tagged_products';
  const entity = 'product';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const displayTagsList = await callGetAPI(`${CONSTANTS.API_BASE_URL}/api/resource/Tag`, token);

  if (displayTagsList?.data?.data?.length > 0) {
    const getDisplayTagsProductsList: any = await Promise.all(
      displayTagsList?.data?.data?.length > 0 &&
        displayTagsList?.data?.data.map(async (tag: any) => {
          const res = await callGetAPI(
            `${CONSTANTS.API_BASE_URL}/${CONSTANTS.SUMMIT_API_SDK}${params}&tag=${tag.name}&currency=${currencyValue}`,
            token
          );
          return { tag_name: tag.name, value: res?.data };
        })
    );

    return getDisplayTagsProductsList;
  } else {
    return displayTagsList;
  }
};

export default getDisplaytagsDataFromAPI;
