import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";
import {
  HandleAPIExpirationTime,
  handleUpdateCachingOfData,
} from "../../../helpers/handle-api-cache-data";
const fetchHomeBannerData = async (TokenFromStore: any) => {
  const version = CONSTANTS.VERSION;
  const method = "get";
  const entity = "banner";
  let response: any;

  const params = `?version=${version}&method=${method}&entity=${entity}`;

  const config = {
    headers: {
      Authorization: TokenFromStore,
    },
  };

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`;
  await axios
    .get(`${url}`, { ...config, timeout: 5000 })
    .then((res) => {
      console.log("carousel api res without token", res);
      response = res;
    })
    .catch((err) => {
      console.log("carousel api res err", err);
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

const getHomeBannersList = (TokenFromStore: any) => fetchHomeBannerData(TokenFromStore);

export default getHomeBannersList;
