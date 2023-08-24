import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const getDealerLedgerSummary = async (token: any) => {
  console.log("token ledger", token);
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_ledger_summary";
  const entity = "gl";

  const params = `?version=${version}&method=${method}&entity=${entity}`;
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
      console.log("dealer summary api res", res);
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
export default getDealerLedgerSummary;