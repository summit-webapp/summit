import axios from "axios";
import { CONSTANTS } from "../../config/app-config";


interface IRaw_Data {
    version?: string;
    method?: string;
    entity?: string;
    usr?: string;
    name?: string;
    pwd?: string;
    via_google?: boolean;
    redirect?: boolean;
    random?: any;
}
const CheckGuestLogin = async (request: any) => {
    let response: any;
    let raw_data: IRaw_Data;
    const version = CONSTANTS.VERSION;

    let isVisitor =
        typeof window !== "undefined" ? localStorage.getItem("guest") : null;

    console.log("login is visitor", isVisitor);

    raw_data = {
        version: "v1",
        method: "existing_user_signin",
        entity: "signin",
        usr: request.email,
        pwd: request.password,
        random: isVisitor
        // redirect: true,
    };

    console.log("Login visitor api");
    console.log("login visitor raw data", raw_data);
    await axios
        .post(
            `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}`,
            raw_data,
            { timeout: 5000 }
        )
        .then((res) => {
            console.log("LOGIN API FILE visitor", res);
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


export default CheckGuestLogin;
