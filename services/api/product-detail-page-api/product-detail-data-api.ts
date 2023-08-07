import axios from "axios";
import { API_CONFIG } from "../../config/api-config";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

export const fetchProductDetailData = async (
  product_id: any,
  currency: any,
  token: any
) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_details";
  const entity = "product";

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&item=${product_id}&currency=${currency}`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .get(`${url}`, { ...config, timeout: 5000 })
    .then((res: any) => {
      console.log("detail data api response", res);
      response = res;
    })
    .catch((err) => {
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
