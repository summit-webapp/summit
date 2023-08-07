import axios from "axios";
import { CONSTANTS } from "../../../config/app-config";
import { client } from "./../cookie-instance-api";
import { getEnquiryHistory } from "./enquiry-history-api";
import AgeingReport from "./aging-report-api";
export const ProfileDataFetch = async (token?: any) => {
  let response: any;
  let responseVal: any;
  let getEnquiryHistoryResponse: any;
  let ageingReportResponse: any;
  const version = CONSTANTS.VERSION;
  const method = "get_profile";
  const entity = "profile";
  const params = `?version=${version}&method=${method}&entity=${entity}`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      ...config,
      timeout: 5000,
    })
    // .get( `${BASE_URL}api/resource/${role}/${profileDetails.profile_name}`,
    //   config)
    .then((res) => {
      responseVal = res;
      console.log("api response1", responseVal);
    })
    .then(async (res) => {
      getEnquiryHistoryResponse = await getEnquiryHistory(token);
      console.log("api response2", getEnquiryHistoryResponse);
      response = {
        ...responseVal,
        enquiryData: [...getEnquiryHistoryResponse],
      };
      console.log("api response", response);
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
  console.log(response, "dddd");
  return response;
};
