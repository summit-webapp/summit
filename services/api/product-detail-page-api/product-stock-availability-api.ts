import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

export const fetchStockAvailability = async (item_code: any, qty: any, token: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "check_availability";
  const entity = "product";
  console.log("qtt", qty);
  const params = `?version=${version}&method=${method}&entity=${entity}&item_code=${item_code}&qty=${qty}`;


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

const getStockAvailability = (item_code: any, qty: any, token: any) =>
  fetchStockAvailability(item_code, qty, token);
export default getStockAvailability;
