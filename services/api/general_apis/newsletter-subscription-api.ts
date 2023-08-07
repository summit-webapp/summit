import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "./cookie-instance-api";

const AddSubscriber = async (email: any, token: any) => {
  const version = CONSTANTS.VERSION;
  const method = "add_subscriber";
  const entity = "registration";
  let response: any;

  const params = `?version=${version}&method=${method}&entity=${entity}`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}&email=${email}`,
      undefined,
      { ...config, timeout: 5000 }
    )
    .then((res) => {
      console.log("subs email in api", res);
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
const getSubscriber: any = (email: any, token: any) =>
  AddSubscriber(email, token);
export default getSubscriber;
