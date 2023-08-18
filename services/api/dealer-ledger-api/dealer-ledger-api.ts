import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const getDealerLedger = async (request: any) => {
  console.log("dealer ledger req", request)
  let response: any;
  let params: any
  const version = CONSTANTS.VERSION;
  const method = "get_dealer_ledger";
  const entity = "gl";
  const party = request.partyName;
  const month = request.month;
  const FromDate = request.fromDate;
  const ToDate = request.toDate;

  if (request.month) {
    params = `?version=${version}&method=${method}&entity=${entity}&party=${party}&month=${month}`;
  } else {
    params = `?version=${version}&method=${method}&entity=${entity}&party=${party}&from_date=${FromDate}&to_date=${ToDate}`;

  }

  const config = {
    headers: {
      Authorization: request.token,
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
  return response
};

export default getDealerLedger;