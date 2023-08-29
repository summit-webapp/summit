import { CONSTANTS } from "../../config/app-config";
import axios from "axios";

const MetaTag = async (url: any) => {
  let meta_data;
  // console.log("meta tags component", url);

  await axios
    .get(`${url}`, { timeout: 5000 })
    .then((res) => {
      console.log("meta tag res", res);
      meta_data = res;
    })
    .catch((err) => {
      if (err.code === "ECONNABORTED") {
        console.log("req time out");
        meta_data = "Request timed out";
      } else if (err.code === "ERR_BAD_REQUEST") {
        console.log("bad request");
        meta_data = "Bad Request";
      } else if (err.code === "ERR_INVALID_URL") {
        console.log("invalid url");
        meta_data = "Invalid URL";
      } else {
        console.log("navbar api res err", err);
        meta_data = err;
      }
    });

  return meta_data;
};

export default MetaTag;
