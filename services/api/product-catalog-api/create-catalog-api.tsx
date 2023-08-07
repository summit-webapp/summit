import React from "react";
import { CONSTANTS } from "../../config/app-config";
import axios from "axios";

const CreateCatalog = async (catalogobj:any,token:any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "put";
  const entity = "catalog";
  const params = `?version=${version}&method=${method}&entity=${entity}&catalog_name=${catalogobj}&catalog_access_level=Public`;
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`,
      undefined,
      config
    )
    .then((res) => (response = res.data))
    .catch((error) => console.log(error));

  return response;
};

export default CreateCatalog;
