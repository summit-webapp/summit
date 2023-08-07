import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const CheckGuestUser = async (token: any) => {
  let response: any;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .get(`${CONSTANTS.API_BASE_URL}/api/method/frappe.auth.get_logged_user`, {
      ...config,
      timeout: 5000,
    })
    .then((res) => {
      const saveGuest = res?.data?.message.includes("random");
      console.log("guest login check gg", saveGuest);
      if (saveGuest) {
        localStorage.setItem("guest", res?.data?.message);
      }
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

export default CheckGuestUser;
