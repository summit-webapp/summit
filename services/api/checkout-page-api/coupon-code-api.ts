import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

const CouponCodePostApi = async (item_code: any, coupon_code: any, token: any) => {
  let response: any;

  const version = CONSTANTS.VERSION;
  const method = "put";
  const entity = "coupon_code";

  const config = {
    headers: {
      Authorization: token,
    },
  };

  const body = {
    version: version,
    method: method,
    entity: entity,
    id: item_code,
    coupon_code: coupon_code,
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}`, body, {
      ...config,
      timeout: 5000,
    })
    .then((res: any) => {
      response = res;
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

export default CouponCodePostApi;
