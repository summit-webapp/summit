import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const RegisterFetch = async (request: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "customer_signup";
  const entity = "registration";
  console.log(request, "body");
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const encodedPassword = encodeURIComponent(request.confirm_password);

  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  //    const val= JSON.stringify(body)

  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}&email=${request.email}&name=${request.name}&contact_no=${request.contact}&address=${request.address_1}&address_2=${request.address_2}&gst_number=${request.gst_number}&city=${request.city}&state=${request.state}&postal_code=${request.postal_code}&password=${encodedPassword}&territory=All Territories`,
      undefined,
      { ...config, timeout: 5000 }
    )
    .then((res) => {
      console.log(res, "rrrr");
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

const RegistrationApi = (request: any) => RegisterFetch(request);

export default RegistrationApi;
