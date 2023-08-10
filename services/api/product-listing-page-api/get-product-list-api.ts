import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

export const fetchProductListing = async (query: any) => {
  console.log(query, "page query");
  let response: any;
  let url: any;
  let page_no: any;
  let limit: any;
  const version = CONSTANTS.VERSION;
  if (CONSTANTS.ENABLE_LOAD_MORE) {
    page_no = 1;
    limit = 4 * Number(query.url_params.page);
  }
  if (CONSTANTS.ENABLE_PAGINATION) {
    page_no = query?.url_params?.page;
    limit = 12;
  }
  const price_range = "low_to_high";
  const category: any = query.url_params.category;

  const url_params_key = Object.keys(query.url_params);
  const url_params_values = Object.values(query.url_params);

  console.log("search work", query);
  // console.log("search work", url_params_values);

  const urlParams = Object.keys(query.url_params)
    .map((key) => {
      if (key === "filter") {
        return `${key}={"${query.filterDoctype}":"${query.filterDocname}", "sections":${query.url_params.filter}}`;
      } else {
        return `${key}=${encodeURIComponent(query.url_params[key])}`;
      }
    })
    .join("&");

  const modifiedParams = urlParams
    .split("&")
    .filter(
      (param) => !param.startsWith("page=") && !param.startsWith("category=")
    )
    .join("&");

  // console.log("search work url params", modifiedParams);

  const config = {
    headers: {
      Authorization: query.token,
    },
  };

  if (query?.url_params?.hasOwnProperty("category")) {
    if (query.router_origin === "product-category") {
      const method = "get_list";
      const entity = "product";
      url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&page_no=${page_no}&limit=${limit}&price_range=${price_range}&category=${category}&${modifiedParams}`;
    } else if (query.router_origin === "catalog") {
      const method = "get_items";
      const entity = "catalog";
      url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&page_no=${page_no}&limit=${limit}&catalog_slug=${category}`;
      // url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&page_no=${page_no}&limit=${limit}&price_range=${price_range}&category=${category}&${modifiedParams}`;
    } else if (query.router_origin === "brand") {
      const method = "get_list";
      const entity = "product";
      url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&page_no=${page_no}&limit=${limit}&brand=${category}`;
    }
  } else {
    const method = "get_list";
    const entity = "product";
    url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&page_no=${page_no}&limit=${limit}&price_range=${price_range}&${modifiedParams}`;
  }

  await axios
    .get(`${url}`, { ...config, timeout: 5000 })
    .then((res) => {
      console.log("product listing api res successful", res);
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
};
