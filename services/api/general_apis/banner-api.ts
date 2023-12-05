import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';

export const fetchBannerApi = async (category?: any, token?: any) => {
    let response: any;
    const version = CONSTANTS.VERSION;
    let url: any;
    const method = 'get';
    const entity = 'banner';
    if (category === undefined) {
        console.log("bannerrr ee")
        url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}`;
    } else {
        console.log("bannerrr ee")
        url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&category=${category}`;
    }
    const config = {
        headers: {
            // Authorization: token,
        },
    };

    await axios
        .get(`${url}`, { ...config, timeout: 5000 })
        .then((res: any) => {
            console.log('banner api response', res);
            response = res;
        })
        .catch((err) => {
            if (err.code === 'ECONNABORTED') {
                response = 'Request timed out';
            } else if (err.code === 'ERR_BAD_REQUEST') {
                response = 'Bad Request';
            } else if (err.code === 'ERR_INVALID_URL') {
                response = 'Invalid URL';
            } else {
                response = err;
            }
        });
    return response;
};
