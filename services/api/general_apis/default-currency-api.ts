import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

export const getMultiCurrencyValue = async () => {
  let response: any;

  const version = CONSTANTS.VERSION;
  const method = "get_default_currency";
  const entity = "product";
  const params = `version=${version}&method=${method}&entity=${entity}`;

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?${params}`;
  console.log("default multi currency url", url);
  await axios
    .get(`${url}`, { timeout: 5000 })
    .then((res: any) => {
      // console.log("multi currenct default value api", res);
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
