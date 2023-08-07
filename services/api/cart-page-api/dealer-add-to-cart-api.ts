import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

const DealerAddToCartPostApi: any = async (item_data: any) => {
  let response: any;
  let version = CONSTANTS.VERSION;
  const method = "put_products";
  const entity = "cart";

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const config = {
    headers: {
      Authorization: token,
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
      console.log("dealer add to cart res", res);
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

const DealerAddToCartApi = (item_data: any) =>
  DealerAddToCartPostApi(item_data);

export default DealerAddToCartApi;
