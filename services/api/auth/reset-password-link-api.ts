import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const ResetPassword = async (values: any, hostName: any) => {
  console.log("reset pswd link", values, hostName);
  let response: any;
  const ResetLink: any = `${hostName}/reset-password`;

  let body = {
    version: CONSTANTS.VERSION,
    method: "send_reset_link",
    entity: "registration",
    link: ResetLink,
    email: values.email,
  };

  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}`,
      body
      // config
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

const ResetPasswordLink = (values: any, hostName: any) =>
  ResetPassword(values, hostName);

export default ResetPasswordLink;
