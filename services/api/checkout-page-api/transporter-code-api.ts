import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const TransporterFetch = async (token: any) => {
  let response: any;
  let version: any = CONSTANTS.VERSION;
  let method: any = "get_transporters";
  let entity: any = "profile";
  let params: any = `?version=${version}&method=${method}&entity=${entity}`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .get(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      ...config,
      timeout: 5000,
    })
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

const getTransportData = (token: any) => TransporterFetch(token);

export default getTransportData;
