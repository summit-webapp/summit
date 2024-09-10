import axios from 'axios';
import { CONSTANTS } from '../../../services/config/app-config';

const UploadReviewPhotoAPI = async (request: any, token: any) => {
  let response: any;
  const formData = new FormData();
  formData.append('file', request);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: token,
    },
    timeout: 5000,
  };
  await axios
    .post(`${CONSTANTS.API_BASE_URL}/api/method/upload_file`, formData, config)
    .then((res) => {
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

export default UploadReviewPhotoAPI;
