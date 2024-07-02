import { callGetAPI } from '../../../utils';
import { CONSTANTS } from '../../config/app-config';

const fetchNavbarData = async (token: any) => {
  const version = CONSTANTS.VERSION;
  const method = 'get_mega_menu';
  const entity = 'mega_menu';
  let response: any;

  const params = `?version=${version}&method=${method}&entity=${entity}`;
   response = callGetAPI(
    `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`,
    token
  );
  console.log(response, 'newData');
};

const getNavbarList = (token: any) => fetchNavbarData(token);

export default getNavbarList;
