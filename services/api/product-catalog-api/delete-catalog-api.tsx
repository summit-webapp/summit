import React from "react";
import { CONSTANTS } from "../../config/app-config";
import axios from "axios";

const deleteCatalog = async (catalogname:any,token:any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "delete";
  const entity = "catalog";
  const params = `?version=${version}&method=${method}&entity=${entity}&catalog_name=${catalogname}`;
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .delete(
      `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`,
      config
    )
    .then((res) => (response = res.data))
    .catch((error) => console.log(error));

  return response;
};

export default deleteCatalog;
