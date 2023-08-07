import axios from "axios";
import { CONSTANTS } from "../../../config/app-config";
import { client } from "./../cookie-instance-api";

const AgeingReport = async () => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "ageing_report";
  const entity = "profile";

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  const params = `?version=${version}&method=${method}&entity=${entity}`;
  await axios
    .get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      ...config,
      timeout: 5000,
    })
    .then((res) => {
      console.log("ageing report in api file res", res);
      response = res?.data?.message;
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

export default AgeingReport;
