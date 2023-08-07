import axios from "axios";
import { CONSTANTS } from "../../../config/app-config";
import { client } from "./../cookie-instance-api";

export const getEnquiryHistory = async (token?: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_quotation_history";
  const entity = "cart";
  const params = `?version=${version}&method=${method}&entity=${entity}`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      ...config,
      timeout: 5000,
    })
    .then((res) => {
      console.log("###quot in api", res);

      response = res?.data?.message?.data;
      console.log("###quot in api response", response);
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
