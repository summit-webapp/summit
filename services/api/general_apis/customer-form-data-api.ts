import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "./cookie-instance-api";

let response: any;

export const FetchStateForAddressForm = async (token: any) => {
  const version = CONSTANTS.VERSION;
  const stateMethod = "get_states";
  const entity = "utils";
  const stateParams = `?version=${version}&method=${stateMethod}&entity=${entity}`;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${stateParams}`,
      config
    )
    .then((res: any) => {
      response = res?.data?.message?.data;
    })
    .catch((err: any) => {
      console.log("err", err);
    });
  return response;
};

export const FetchCitiesForAddressForm = async (state: any, token: any) => {
  const version = CONSTANTS.VERSION;
  const stateMethod = "get_cities";
  const entity = "utils";
  const citiesParams = `?version=${version}&method=${stateMethod}&entity=${entity}&state=${state}`;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${citiesParams}`,
      { ...config, timeout: 5000 }
    )
    .then((res: any) => {
      response = res?.data?.message?.data;
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
