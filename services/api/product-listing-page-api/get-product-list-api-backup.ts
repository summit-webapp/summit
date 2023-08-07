import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

export const fetchProductListing = async (query: any) => {
  let response: any;
  let url: any;
  const version = CONSTANTS.VERSION;
  const method = "get_list";
  const entity = "product";
  const page_no: number = query.url_params.page;
  const limit: number = 12;
  const price_range = "low_to_high";
  const category: any = query.url_params.category;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  if (query.url_params.hasOwnProperty("filter")) {
    const convertingFiltersFromStringToObj = JSON.parse(
      query.url_params.filter
    );
    console.log(
      "product listing thunk router in api json parse",
      convertingFiltersFromStringToObj
    );
    url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&page_no=${page_no}&limit=${limit}&price_range=${price_range}&category=${category}&filter={"${query.filterDoctype}":"${query.filterDocname}", "sections":${query.url_params.filter}}`;
  } else {
    url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&page_no=${page_no}&limit=${limit}&price_range=${price_range}&category=${category}`;
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
