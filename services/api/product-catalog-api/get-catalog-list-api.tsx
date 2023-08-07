import React from "react";
import { CONSTANTS } from "../../config/app-config";
import axios from "axios";

const GetCatalogList = async (token:any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get";
  const entity = "catalog";
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`,
      config
    )
    .then((res) => (response = res.data))
    .catch((error) => console.log(error));

  return response;
};

export default GetCatalogList;