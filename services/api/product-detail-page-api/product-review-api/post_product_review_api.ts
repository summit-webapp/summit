import { CONSTANTS } from '../../../config/app-config';
import axios from 'axios';

const PostProductReviewAPI = async (request: any, token: any) => {
    let response: any;

    const version = CONSTANTS.VERSION;
    const method = "create_customer_review";
    const entity = "customer_review";
    const config = {
        headers: {
            Accept: "application/json",
            Authorization: token,
        },
        
    };
    
    console.log(request)
    const requestBody = {
        version,
        method,
        entity,
        name: request.name,
        email: request.email,
        item_code: request.item_code,
        comment:request.comment,
        rating: request.rating,
        images: request.images
    };
    console.log(requestBody)
    await axios
        .put(
            `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}`, requestBody, { ...config, timeout: 5000 }
        )
        .then((res) => {
            console.log(res, "post review message in api",res);
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

}

export default PostProductReviewAPI;
