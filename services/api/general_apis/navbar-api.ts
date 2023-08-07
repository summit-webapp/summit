import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const fetchNavbarData = async (token: any) => {
  const version = CONSTANTS.VERSION;
  const method = "get";
  const entity = "mega_menu";
  let response: any;

  const params = `?version=${version}&method=${method}&entity=${entity}`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      ...config,
    })
    .then((res) => {
      console.log("navbar api in api file", res);
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
};

const getNavbarList = (token: any) => fetchNavbarData(token);

export default getNavbarList;
