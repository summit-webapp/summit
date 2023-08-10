import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const getDealerLedger = async (token: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_dealer_ledger";
  const entity = "gl";
  const party = "";
  const month = "Dec 2022";

  const params = `?version=${version}&method=${method}&entity=${entity}&party=${party}&month=${month}`;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  await axios
    .get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      ...config,
      timeout: 5000,
    })
    .then((res: any) => {
      console.log("dealer ledger api res", res);
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
};

export default getDealerLedger;
