import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

const GetQuotationPostApi = async (quotation_id: any, token:any) => {
  let response: any;
  let version = CONSTANTS.VERSION;
  const method = "request_for_quotation";
  const entity = "cart";

  const params = `?version=${version}&method=${method}&entity=${entity}&quotation_id=${quotation_id}`;

  // const token =
  //   typeof window !== "undefined" ? localStorage.getItem("token") : null;

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

const getQuotationCart: any = (quotation_id: any, token:any) =>
  GetQuotationPostApi(quotation_id, token);
export default getQuotationCart;
