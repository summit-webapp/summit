import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "./cookie-instance-api";

const QuickOrderFetch = async (request: any) => {

  const part_number = { oem_part_number: `${request.partNumberInputField}` };
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_list";
  const entity = "product";

  const config = {
    headers: {
      Authorization: request.token,
    },
  };

  const params = `?version=${version}&method=${method}&entity=${entity}`;
  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS
      }${params}&or_filters=${JSON.stringify(part_number)}`,
      { ...config, timeout: 5000 }
    )
    .then((res) => {
      console.log("enter quick order in api", res);
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
const getQuickOrder: any = (request: any) =>
  QuickOrderFetch(request);
export default getQuickOrder;
