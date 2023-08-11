import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

const RedirectPayment = async (
  salesOrderId: any,
  amount: any,
  document_type: any,
  token: any
) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_razorpay_payment_url";
  const entity = "order";
  const orderAmount = amount;
  const order_document_type = document_type;
  const order_id = salesOrderId;
  const payment_gateway = "Razorpay";

  const params = `?version=${version}&method=${method}&entity=${entity}&amount=${orderAmount}&document_type=${order_document_type}&order_id=${order_id}&payment_gateway=${payment_gateway}`;

  console.log(
    "razor pay api params",
    CONSTANTS.API_BASE_URL,
    CONSTANTS.API_MANDATE_PARAMS,
    params,
    token
  );


  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`,undefined, {
      ...config,
      timeout: 5000,
    })

    .then((res) => {
      console.log("payment", res);
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

export default RedirectPayment;
