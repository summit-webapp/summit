import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const AddToCartPostApi: any = async (
  item_code: any,
  currencyVal?: any,
  token?: any
) => {
  console.log("add currency in api", token);
  let response: any;
  let version = CONSTANTS.VERSION;
  const method = "put_products";
  const entity = "cart";

  const config = {
    headers: {
      Authorization: token,
    },
  };

  let body = {
    version: version,
    method: method,
    entity: entity,
    item_list: item_code,
    currency: currencyVal,
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}`, body, {
      ...config,
      timeout: 5000,
    })
    .then((res: any) => {
      console.log("add to cart res", res);
      response = res.data.message;
    })
    .catch((err: any) => {
      if (err.code === "ECONNABORTED") {
        response = "Request timed out";
      } else if (err.code === "ERR_BAD_REQUEST") {
        response = "Bad Request";
      } else if (err.code === "ERR_INVALID_URL") {
        response = "Invalid URL";
      } else {
        response = err;
      }
    });
  return response;
};

export const QuickOrderAddToCart = async (item_data: any) => {
  console.log("uick order add cart api", item_data);
  let response: any;
  let version = CONSTANTS.VERSION;
  const method = "put_products";
  const entity = "cart";

  const config = {
    headers: {
      Authorization: item_data.token,
    },
  };

  let body = {
    version: version,
    method: method,
    entity: entity,
    item_list: item_data,
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}`, body, {
      ...config,
      timeout: 5000,
    })
    .then((res: any) => {
      console.log("uick order add to cart res", res);
      response = res.data.message;
    })
    .catch((err: any) => {
      if (err.code === "ECONNABORTED") {
        response = "Request timed out";
      } else if (err.code === "ERR_BAD_REQUEST") {
        response = "Bad Request";
      } else if (err.code === "ERR_INVALID_URL") {
        response = "Invalid URL";
      } else {
        response = err;
      }
    });
  return response;
};

const AddToCartApi = (item_code: any, currencyVal?: any, token?: any) =>
  AddToCartPostApi(item_code, currencyVal, token);

export default AddToCartApi;
