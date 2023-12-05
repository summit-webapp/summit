
import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const CreateWarrantyClaim = async (request: any, token?: any) => {
    let response: any;

    const version = CONSTANTS.VERSION;
    const method = 'get_list';
    const entity = 'product';



    const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}`;

    const config = {
        headers: {
            Authorization: token,
        },

    };
    await axios
        .post(
            url,
            request,
            config
        )
        .then((res) => {
            console.log(res, "serial response in api");
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

export default CreateWarrantyClaim;
