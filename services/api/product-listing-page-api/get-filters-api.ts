import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";
import { API_CONFIG } from "../../config/api-config";

export const fetchProductListingPageFilters = async (request: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_filters";
  const entity = "filter";
  const doctype = "Category";

  // we are passing category in docname variable because in erpnext it checks whether that category is present in docname
  const docname = request.query.category;


  const config = {
    headers: {
      Authorization: request.token,
    },
  };

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&doctype=${doctype}&docname=${docname}`;

  await axios
    .get(`${url}`, { ...config, timeout: 5000 })
    .then((res) => {
      console.log("filters check in product listing api res successful", res);
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
