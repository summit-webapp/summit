import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const ResetPasswordApi = async (request: any) => {
  console.log("reset pswd api", request);
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "reset_password";
  const entity = "registration";

  const encodedPassword = encodeURIComponent(request.confirmPassword);

  const params: any = `?version=${version}&method=${method}&entity=${entity}&email=${request.email}&new_password=${encodedPassword}`;

  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`,
      undefined,
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

export default ResetPasswordApi;
