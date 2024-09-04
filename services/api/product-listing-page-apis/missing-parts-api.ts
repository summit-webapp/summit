// import axios from 'axios';
// import { API_CONFIG } from '../../config/api-config';
// import { CONSTANTS } from '../../config/app-config';
// import { client } from '../general_apis/cookie-instance-api';

// export const MissingPartsAPI = async (
//   token: any,
//   searchText: any,
//   descriptionValue: any
// ) => {
//   let response: any;
//   let url: any;
//   const version = CONSTANTS.VERSION;
//   const method = 'customer_inquiry';
//   const entity = 'profile';

//   const config = {
//     headers: {
//       Authorization: token,
//     },
//   };

//   if (searchText) {
//     url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&search_text=${searchText}`;
//   } else {
//     url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&item_desc=${descriptionValue}`;
//   }

//   await axios
//     .post(`${url}`, undefined, { ...config, timeout: 5000 })
//     .then((res: any) => {
//       response = res;
//     })
//     .catch((err) => {
//       if (err.code === 'ECONNABORTED') {
//         response = 'Request timed out';
//       } else if (err.code === 'ERR_BAD_REQUEST') {
//         response = 'Bad Request';
//       } else if (err.code === 'ERR_INVALID_URL') {
//         response = 'Invalid URL';
//       } else {
//         response = err;
//       }
//     });
//   return response;
// };
