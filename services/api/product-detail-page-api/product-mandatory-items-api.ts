import axios from "axios";
import { API_CONFIG } from "../../config/api-config";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

export const fetchProductMatchingItems = async (
  product_id: any,
  currency: any,
  token: any
) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_recommendation";
  const entity = "product";

  const itemOptions = ["Suggested", "Alternate", "Equivalent", "Mandatory"];

  const config = {
    headers: {
      Authorization: token,
    },
  };

  const getItemOptionsProducts = await Promise.all(
    itemOptions.map(async (option_type: any) => {
      try {
        const res = await axios.get(
          `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&ptype=${option_type}&item=${product_id}&currency=${currency}`,
          { ...config, timeout: 5000 }
        );
        if (res.status === 200 && res.data.message.hasOwnProperty("data")) {
          return { name: option_type, values: res.data.message.data };
        } else {
          return { name: option_type, values: [] };
        }
      } catch (err: any) {
        if (err.code === "ECONNABORTED") {
          response = "Request timed out";
        } else if (err.code === "ERR_BAD_REQUEST") {
          response = "Bad Request";
        } else if (err.code === "ERR_INVALID_URL") {
          response = "Invalid URL";
        } else {
          response = err;
        }
      }
    })
  );

  return getItemOptionsProducts;
};
