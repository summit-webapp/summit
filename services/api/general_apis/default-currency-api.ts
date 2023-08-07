import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

export const getMultiCurrencyValue = async (token: any) => {
  let response: any;

  const params = `name=8848 Digital&fields=["default_currency"]`;

  const url = `${CONSTANTS.API_BASE_URL}/api/resource/Company?${params}`;
  await axios
    .get(`${url}`)
    .then((res: any) => {
      console.log("multi currenct default value api", res);
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
