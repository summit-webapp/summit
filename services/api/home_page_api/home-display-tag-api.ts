import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

const fetchDisplaytags = async (token: any,currencyValue:any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_tagged_products";
  const entity = "product";
  const params = `?version=${version}&method=${method}&entity=${entity}`;


  const config = {
    headers: {
      Authorization: token,
    },
  };

  const displayTagsList = await axios
    .get(`${CONSTANTS.API_BASE_URL}/api/resource/Tag`, {
      ...config,
      timeout: 5000,
    })
    .then((res) => {
      console.log("display tag new arrival api res in api", res);
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  console.log("displayTagsList", displayTagsList)

  const getDisplayTagsProductsList = await Promise.all(
    displayTagsList.map(async (tag: any) => {
      try {
        const res = await axios.get(
          `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}&tag=${tag.name}&currency=${currencyValue}`,
          config
        );
        console.log("display tag new arrival api res in api 1", res);
        return { tag_name: tag.name, value: res.data.message.data };
      } catch (err: any) {
        if (err.code === "ECONNABORTED") {
          response = "Request timed out";
        } else if (err.code === "ERR_BAD_REQUEST") {
          response = "Bad Request";
        } else if (err.code === "ERR_INVALID_URL") {
          response = "Invalid URL";
        } else {
          response = err;
        }
      }
    })
  );

  console.log("display tag list", getDisplayTagsProductsList);

  return getDisplayTagsProductsList;
};

const displayTagList = (token: any,currencyValue?:any) => fetchDisplaytags(token,currencyValue);
export default displayTagList;
