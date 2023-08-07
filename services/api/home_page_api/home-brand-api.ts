import React from "react";
import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";
const fetchBrands = async (token: any) => {
  const version = CONSTANTS.VERSION;
  const method = "get";
  const entity = "brand";
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  let response: any;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .get(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      ...config,
      timeout: 5000,
    })
    .then((res: any) => {
      console.log(res);
      response = res?.data?.message?.data;
      // response = res?.data?.message?.data.sort(function (a: any, b: any) {
      //     return a.seq - b.seq;
      // });
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

const getBrandsList = (token: any) => fetchBrands(token);

export default getBrandsList;
