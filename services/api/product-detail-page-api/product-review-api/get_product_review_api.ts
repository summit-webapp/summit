
import axios from "axios";
import { CONSTANTS } from "../../../config/app-config";


const GetProductReviewAPI = async (item_code: any, token?: any) => {

    let response: any;
    const version = CONSTANTS.VERSION;
    const method = "get_customer_review";
    const entity = "customer_review";

    const params = `?version=${version}&method=${method}&entity=${entity}&item_code=${item_code}`;
    const config = {
        headers: {
            Accept: "application/json",
            Authorization: token,
        }

    };
    await axios
        .get(
            `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
            ...config,
            timeout: 15000,
        })
        .then((res) => {
            response = res?.data?.message?.data;
            console.log(response, "product item get product review response in api");
        })
        .catch((err) => {
            console.log(err, " get product review response in api");
        });
    return response;
}

export default GetProductReviewAPI;
