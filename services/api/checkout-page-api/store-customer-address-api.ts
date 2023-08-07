import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const AddressesPost = async (request: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "put";
  const entity = "customer_address";

  const config = {
    headers: {
      Authorization: request.token,
    },
  };

  const requestValues = request?.value;

  let body = {
    version: version,
    method: method,
    entity: entity,
    ...requestValues,
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}`, body, {
      ...config,
      timeout: 5000,
    })
    .then((res: any) => {
      // if(res?.data?.message?.msg === "success") {
      //   localStorage.setItem("guestId", action?.payload?.customer_id?.name);
      // }
      console.log("address post res", res);
      response = res?.data?.message;
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

const storeCustomerAddress = (request: any) => AddressesPost(request);

export default storeCustomerAddress;
