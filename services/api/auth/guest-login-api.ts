import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { updateFetchLoginUser } from "../../../store/slices/auth/login_slice";

interface IRaw_Data {
  version?: string;
  method?: string;
  entity?: string;
  usr?: string;
  name?: string;
  pwd?: string;
  via_google?: boolean;
  redirect?: boolean;
  guest_token?: any;
}
const CheckGuestLogin = async (request: any) => {
  console.log("login is visitor", request);
  let response: any;
  let raw_data: IRaw_Data;
  const version = CONSTANTS.VERSION;

  let isVisitor =
    typeof window !== "undefined" ? localStorage.getItem("guest") : null;
  let guestToken =
    typeof window !== "undefined" ? localStorage.getItem("guestToken") : null;

  const config = {
    headers: {
      Authorization: guestToken,
    },
  };

  console.log("guestt token", guestToken);
  raw_data = {
    version: version,
    method: "existing_user_signin",
    entity: "signin",
    usr: request.values.email,
    pwd: request.values.password,
    guest_token: isVisitor,
  };

  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}`,
      raw_data,
      { ...config, timeout: 5000 }
    )
    .then((res) => {
      console.log("LOGIN API FILE visitor", res);
      response = res;
      if (response?.data?.data?.message === "Logged In") {
        console.log("in update user");
        localStorage.setItem("isLoggedIn", "true");
      }
      //   if (response?.data?.data?.message === "Logged In") {
      //     console.log("login dispatch", response);
      //     dispatch(successmsg("logged in sucessfully"));
      //     setTimeout(() => {
      //       dispatch(hideToast());
      //     }, 800);
      //     localStorage.removeItem("guest");
      //   } else {
      //     dispatch(failmsg("Invalid Credential"));
      //     setTimeout(() => {
      //       dispatch(hideToast());
      //     }, 1500);
      //   }
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

export default CheckGuestLogin;
