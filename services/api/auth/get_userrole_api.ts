import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const UserRoleFetch = async (token: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_user_profile";
  const entity = "signin";

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}`,
      { ...config, timeout: 5000 }
      // config
    )
    .then((res: any) => {
      response = res?.data?.message?.data;

      if (Object.keys(response)?.length > 0) {
        localStorage.setItem("isDealer", response.is_dealer);
        localStorage.setItem("isSuperAdmin", response.is_superadmin);
      }
    })
    .catch((err: any) => {
      if (err.code === "ECONNABORTED") {
        console.log("req time out");
        response = "Request timed out";
      } else if (err.code === "ERR_BAD_REQUEST") {
        console.log("bad request");
        response = "Bad Request";
      } else if (err.code === "ERR_INVALID_URL") {
        console.log("invalid url");
        response = "Invalid URL";
      } else {
        console.log("navbar api res err", err);
        response = err;
      }
    });

  return response;
};

const UserRoleGet = (token: any) => UserRoleFetch(token);

export default UserRoleGet;
