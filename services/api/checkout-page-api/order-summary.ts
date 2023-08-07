import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

const fetchOrderSummary = async (request: any) => {
  console.log("order summary req", request)
  let response: any;
  let version = CONSTANTS.VERSION;
  let method = "get_summary";
  let entity = "order";
  let id = request.quotationId;
  let params = `?version=${version}&method=${method}&entity=${entity}&id=${id}`;

  const config = {
    headers: {
      Authorization: request.token,
    },
  };

  await axios
    .get(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      ...config,
      timeout: 5000,
    })
    .then((res: any) => {
      console.log("order summ res", res);
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

const getOrderSummary = (request: any) => fetchOrderSummary(request);

export default getOrderSummary;
