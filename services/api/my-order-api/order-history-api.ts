import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const GetCartHistory = async (request: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_list";
  const entity = "order";

  console.log("date range", request);
  const OrderIdParams = `?version=${version}&method=${method}&entity=${entity}&order_id=${request.id}`;
  const getOrderListParams = `?version=${version}&method=${method}&entity=${entity}&date_range=${request.date}`;

  const config = {
    headers: {
      Authorization: request.token,
    },
  };

  if (request.id) {
    await axios
      .get(
        `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${OrderIdParams}`,
        { ...config, timeout: 5000 }
      )
      .then((res) => {
        console.log("get orderid ", res);
        response = res?.data?.message?.data;
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
  } else {
    await axios
      .get(
        `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${getOrderListParams}`,
        { ...config, timeout: 5000 }
      )
      .then((res) => {
        console.log("get orderlist ", res);
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
  }
};

export default GetCartHistory;
