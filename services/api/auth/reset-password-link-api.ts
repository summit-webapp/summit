import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

const ResetPassword = async (request: any) => {
  console.log("reset pswd link", request);
  let response: any;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  let body = {
    version: CONSTANTS.VERSION,
    method: "send_reset_link",
    entity: "registration",
    link: "http://localhost:3000/reset_password",
    email: request.email,
  };

  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}`,
      body,
      config
    )
    .then((res: any) => {
      console.log("res", res);
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

const ResetPasswordLink = (request: any) => ResetPassword(request);

export default ResetPasswordLink;
