import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "./cookie-instance-api";

export default async function QuickOrderAddCart() {
  let response;

  const method = "put_products";
  const entity = "cart";

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  let body = {
    version: "v1",
    method: `${method}`,
    entity: `${entity}`,
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}`, body, {
      ...config,
      timeout: 5000,
    })
    .then((res) => {
      console.log("Add to cart api - ", res);
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
}
