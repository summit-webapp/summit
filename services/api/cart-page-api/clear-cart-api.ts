import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

const ClearCartPostApi: any = async (quotation_id: any, token: any) => {
  let response: any;
  let version = CONSTANTS.VERSION;
  const method = "clear_cart";
  const entity = "cart";
  const id = quotation_id;

  const params = `?version=${version}&method=${method}&entity=${entity}&quotation_id=${id}`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`,
      undefined,
      { ...config, timeout: 5000 }
    )
    .then((res: any) => {
      console.log("clear cart res", res);
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

const ClearCartApi = (quotation_id: any, token: any) =>
  ClearCartPostApi(quotation_id, token);

export default ClearCartApi;
