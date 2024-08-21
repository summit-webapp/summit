import axios from 'axios';

const MetaTag = async (url: any) => {
  let meta_data;

  await axios
    .get(`${url}`, { timeout: 5000 })
    .then((res) => {
      meta_data = res;
    })
    .catch((err) => {
      if (err.code === 'ECONNABORTED') {
        meta_data = 'Request timed out';
      } else if (err.code === 'ERR_BAD_REQUEST') {
        meta_data = 'Bad Request';
      } else if (err.code === 'ERR_INVALID_URL') {
        meta_data = 'Invalid URL';
      } else {
        meta_data = err;
      }
    });

  return meta_data;
};

export default MetaTag;
