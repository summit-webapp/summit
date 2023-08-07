import axios from "axios";
import { client } from "./../cookie-instance-api";

export const GetEnquiryHistoryPdf = async (pdf_link: any) => {
  const api_res = await axios
    .get(`${pdf_link}`, {
      responseType: "blob",
    })
    .then((res) => {
      console.log("pdf res axios", res);
      const file = new Blob([res.data], { type: "application/pdf" });
      console.log("pdf res axios", file);
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      console.log("pdf res axios file url", fileURL);
      //Open the URL on new Window
      window.open(fileURL);
      // return pdf_link
    })
    .catch((err) => console.log(err));
  console.log("pdf res", api_res);

  return pdf_link;
};
