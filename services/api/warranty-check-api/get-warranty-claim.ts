import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';

export const WarrantyGetClaimAPI = async (
    serial_no: any,
    token?: any
) => {
    let response: any;
    const version = CONSTANTS.VERSION;
    const method = 'get_warranty_claim';
    const entity = 'warranty_claim';

    const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&serial_no=${serial_no}`;

    const config = {
        headers: {
            // Authorization: '',
        },
    };

    await axios
        .get(`${url}`, { ...config, timeout: 5000 })
        .then((res: any) => {
            console.log('Claim data api response', res);
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
