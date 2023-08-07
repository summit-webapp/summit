import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

const ECommerceEnhancedCodeApi = async (salesOrderId: any, token: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_order_details";
  const entity = "order";

  const params = `?version=${version}&method=${method}&entity=${entity}&order_id=${salesOrderId}`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .get(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      ...config,
      timeout: 5000,
    })
    .then((res: any) => {
      response = res;
      console.log("ecommerce", res);
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

export default ECommerceEnhancedCodeApi;
