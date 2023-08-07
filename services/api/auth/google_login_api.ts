import axios, { AxiosRequestHeaders } from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";
interface IRaw_Data {
  version?: string;
  method?: string;
  entity?: string;
  usr?: string;
  email?: string;
  name?: string;
  pwd?: string;
  via_google?: boolean;
  redirect?: boolean;
  with_otp?: boolean;
}

const GoogleLoginFetch = async (request: any) => {
  let response: any;
  let raw_data: IRaw_Data;
  const version = CONSTANTS.VERSION;
  const method = "signin";
  const entity = "signin";
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  console.log("otp req", request);

  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  if (request.isOtpLogin === true) {
    raw_data = {
      email: request.email,
      entity: "otp",
      method: "send_otp",
      version: "v1",
    };

    await axios
      .post(
        `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}`,
        raw_data,
        { ...config, timeout: 5000 }
      )
      .then((res) => {
        console.log("google login response api", res);
        response = res;
      })
      .catch((err) => {
        if (err.code === "ECONNABORTED") {
          console.log("req time out");
          response = "Request timed out";
        } else if (err.code === "ERR_BAD_REQUEST") {
          console.log("bad request");
          response = "Bad Request";
        } else if (err.code === "ERR_INVALID_URL") {
          console.log("invalid url");
          response = "Invalid URL";
        } else {
          console.log("navbar api res err", err);
          response = err;
        }
      });
    return response;
  } else {
    raw_data = {
      usr: request.email,
      pwd: request.password,
      via_google: true,
    };

    await axios
      .post(
        `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`,
        raw_data,
        { ...config, timeout: 5000 }
      )
      .then((res) => {
        console.log("google login response api", res);
        response = res;
      })
      .catch((err) => {
        if (err.code === "ECONNABORTED") {
          console.log("req time out");
          response = "Request timed out";
        } else if (err.code === "ERR_BAD_REQUEST") {
          console.log("bad request");
          response = "Bad Request";
        } else if (err.code === "ERR_INVALID_URL") {
          console.log("invalid url");
          response = "Invalid URL";
        } else {
          console.log("navbar api res err", err);
          response = err;
        }
      });
    return response;
  }
};

const getGoogleLoginApi = (request: any) => GoogleLoginFetch(request);

export default getGoogleLoginApi;
