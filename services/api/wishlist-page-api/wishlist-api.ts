import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

const AddProductToWishlistFetch = async (request: any) => {
  console.log("wishlist add prod id", request.prod_id);
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "add_to_wishlist";
  const entity = "wishlist";
  const item_code = request.prod_id;
  const params = `?version=${version}&method=${method}&entity=${entity}&item_code=${item_code}`;

  const config = {
    headers: {
      Authorization: request.token,
    },
  };

  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`,
      undefined,
      { ...config, timeout: 5000 }
    )
    .then((res) => {
      response = res.data.message;
      console.log("wishlist api res", response);
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

const GetWishlistDataFetch = async (request: any) => {
  console.log(" wishlist get data");
  const version = CONSTANTS.VERSION;
  const method = "get_wishlist_items";
  const entity = "wishlist";
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  let response: any;

  const config = {
    headers: {
      Authorization: request.token,
    },
  };

  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`,
      config
    )
    .then((res) => {
      console.log("handle response", res);
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

const DeleteProductFromWishlistFetch = async (request: any) => {
  console.log(" wishlist get data", request.prod_id);
  let response: any;

  const config = {
    headers: {
      Authorization: request.token,
    },
  };
  const method = "remove_from_wishlist";
  const entity = "wishlist";
  const item_code = request.prod_id;
  const version = CONSTANTS.VERSION;
  const params = `?version=${version}&method=${method}&entity=${entity}&item_code=${item_code}`;
  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`,
      config
    )
    .then((res) => {
      console.log("api res", res);
      response = res?.data?.message;
      console.log("delete wishlist api res", response);
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const AddProductToWishlist = (request: any) =>
  AddProductToWishlistFetch(request);
export const GetWishlistData = (request: any) => GetWishlistDataFetch(request);
export const DeleteProductfromWishlist = (request: any) =>
  DeleteProductFromWishlistFetch(request);
