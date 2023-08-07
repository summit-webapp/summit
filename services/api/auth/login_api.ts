import axios, { AxiosRequestHeaders } from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";
import CheckGuestLogin from "./guest-login-api";
interface IRaw_Data {
  version?: string;
  method?: string;
  entity?: string;
  usr?: string;
  name?: string;
  pwd?: string;
  via_google?: boolean;
  redirect?: boolean;
  random?: string;
}

const loginFetch = async (request: any) => {
  console.log(request, "userLogin12");
  let response: any;
  let raw_data: IRaw_Data;
  const version = CONSTANTS.VERSION;
  const method = "signin";
  const entity = "signin";
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const config = {
    headers: {
      Accept: "application/json",
    },
    // withCredentials: true,
  };

  let isVisitor = localStorage.getItem("guest");

  console.log("login is visitor", isVisitor);

  if (isVisitor !== null) {
    const guestLogin = await CheckGuestLogin(request)
    console.log("guestLogin response", guestLogin)
    // if(guestLogin?.data?.data?.access_token?.access_token){}
    return guestLogin
    // raw_data = {
    //   version: "v1",
    //   method: "existing_user_signin",
    //   entity: "signin",
    //   usr: request.email,
    //   pwd: request.password,
    //   random: isVisitor
    //   // redirect: true,
    // };

    // console.log("Login visitor api");
    // console.log("login visitor raw data", raw_data);
    // await axios
    //   .post(
    //     `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}`,
    //     raw_data,
    //     { ...config, timeout: 5000 }
    //   )
    //   .then((res) => {
    //     console.log("LOGIN API FILE visitor", res);
    //     response = res;

    //   })
    //   .catch((err) => {
    //     if (err.code === "ECONNABORTED") {
    //       response = "Request timed out";
    //     } else if (err.code === "ERR_BAD_REQUEST") {
    //       response = "Bad Request";
    //     } else if (err.code === "ERR_INVALID_URL") {
    //       response = "Invalid URL";
    //     } else {
    //       response = err;
    //     }
    //   });
    // return response;
  } else {
    raw_data = {
      usr: request.email,
      pwd: request.password,
    };

    await axios
      .post(`${CONSTANTS.API_BASE_URL}/api/method/login`, raw_data, {
        ...config,
        timeout: 5000,
      })
      .then((res) => {
        console.log("login api file success", res);
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
  }
};

const getLoginApi = (request: any) => loginFetch(request);

export default getLoginApi;
