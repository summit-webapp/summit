import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

const LogoutFetch = async () => {
  let response: any;
  const version = CONSTANTS.VERSION;


  const config = {
    headers: {
      // Authorization: token,
    },
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}/api/method/logout`, {
      ...config,
      timeout: 5000,
    })
    .then((res) => {
      console.log("logout res in api file  success", res);
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
};

const LogoutList = () => LogoutFetch();

export default LogoutList;
