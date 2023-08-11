import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

const DeleteCartProduct: any = async (
  item_code: any,
  quotationId: any,
  token: any
) => {
  let response: any;
  let version = CONSTANTS.VERSION;
  const method = "delete_products";
  const entity = "cart";
  const id = item_code;
  const quotation = quotationId;

  const params = `?version=${version}&method=${method}&entity=${entity}&item_code=${id}&quotation_id=${quotation}`;

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
      console.log("delete product from cart", res);
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

const DeleteProductFromCart = (item_code: any, quotationId: any, token: any) =>
  DeleteCartProduct(item_code, quotationId, token);

export default DeleteProductFromCart;
