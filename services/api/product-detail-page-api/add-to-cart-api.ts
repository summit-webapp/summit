import { CONSTANTS } from '../../config/app-config';
import { callPostAPI } from '../../../utils/utils';

const postAddToCartApi: any = async ({ params, token }: any) => {
  let version = CONSTANTS.VERSION;
  const method = 'put_products';
  const entity = 'cart';

  const body = {
    version: version,
    method: method,
    entity: entity,
    item_code: params?.item_code,
    party_name: params?.party_name,
    purity: params?.purity,
    cust_name: params?.cust_name,
    colour: params?.colour,
    wastage: params?.wastage,
    qty_size_list: params?.qty_size_list,
    remark: params?.remark,
    user: params?.user,
  };

  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}`;

  const response = await callPostAPI(url, body, token);
  return response;
};

export default postAddToCartApi;
