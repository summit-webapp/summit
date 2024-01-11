import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const ReturnReplaceMyOrderAPI = async (request: any, token?: any) => {
    let response: any;

    const config = {
        headers: {
            Accept: "application/json",
            Authorization: token,
        },
        // timeout: 5000,
    };
    await axios
        .post(
            `${CONSTANTS.API_BASE_URL}/api/method/summitapp.sdk.api`,
            request,
            config
        )
        .then((res) => {
            console.log(res, "response in api");
            response = res?.data?.message;
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

export default ReturnReplaceMyOrderAPI;
