import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';

const SendEmailOTP = async (email: any) => {
    let response: any;
    const version = CONSTANTS.VERSION;
    const method = 'send_otp';
    const entity = 'otp';

    const config = {
        headers: {
            //   Authorization: token,
        },
    };

    await axios
        .get(
            `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&email=${email}`,
            { ...config, timeout: 5000 }
            // config
        )
        .then((res: any) => {
            console.log(res, "res email verify")
            response = res;


        })
        .catch((err: any) => {
            if (err.code === 'ECONNABORTED') {
                console.log('req time out');
                response = 'Request timed out';
            } else if (err.code === 'ERR_BAD_REQUEST') {
                console.log('bad request');
                response = 'Bad Request';
            } else if (err.code === 'ERR_INVALID_URL') {
                console.log('invalid url');
                response = 'Invalid URL';
            } else {
                console.log('navbar api res err', err);
                response = err;
            }
        });

    return response;
};


export default SendEmailOTP;



