import axios from "axios";

const GetSalesVoucherPdf = async (pdf_link: any, token: any) => {
  console.log("reqq", pdf_link, token);
  const pdf = `${pdf_link}`;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const api_res = await axios
    .get(`${pdf}`, config)
    .then((res) => {
      console.log("pdf res axios", res);
      const file = new Blob([res.data], { type: "application/pdf" });

      const fileURL = URL.createObjectURL(file);
    })
    .catch((err) => console.log(err));
  console.log("pdf res", api_res);

  return pdf_link;
};

export default GetSalesVoucherPdf;
