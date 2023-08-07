import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const fetchBillingAddress = async (token: any) => {
  const guestid = localStorage.getItem("guestid");

  const version = CONSTANTS.VERSION;
  const method = "get";
  const entity = "customer_address";
  const type = "Billing";
  const params = `?version=${version}&method=${method}&entity=${entity}&type=${type}`;

  let response: any;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  if (guestid !== null) {
    await axios
      .get(
        `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}&user_id=${guestid}`,
        { ...config, timeout: 5000 }
      )
      .then((res: any) => {
        console.log("ress", res);
        response = res.data.message.data.sort(function (a: any, b: any) {
          return b.set_as_default - a.set_as_default;
        });
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
  } else {
    await axios
      .get(
        `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`,
        config
      )
      .then((res: any) => {
        console.log("ress g", res);

        response = res.data.message.data.sort(function (a: any, b: any) {
          return b.set_as_default - a.set_as_default;
        });
      })
      .catch((err: any) => {
        console.log("err", err);
      });
    return response;
  }
};

const getBillingAddress = (token: any) => fetchBillingAddress(token);

export default getBillingAddress;
