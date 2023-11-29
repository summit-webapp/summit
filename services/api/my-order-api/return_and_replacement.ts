import axios from "axios";
import { CONSTANTS } from "../../config/app-config";



export const ReturnReplacement = async ({
  type,
  description,
  orderId,
  productId,
  file1,
  file2,
  file3,
}: any) => {
  console.log("+++++++ return and replacement response data");
  let response: any;
  const config = {
    headers: {
      Accept: 'application/json'
    },
    withCredentials:true
  };
  const body = {
    version: "v1",
    method: "return_replace_item",
    entity: "order",
    return_replacement: type,
    description: description,
    order_id: orderId,
    product_id: productId,
    img_1: file1,
  };
 

  let res = await axios.post(
    `${CONSTANTS.API_BASE_URL}//api/method/sportnetwork.api.map.version_mapper`,
    body,
    config
  );

  response = res?.data?.message;
  // .then((res) => {
  //   // console.log(res);
  console.log("+++++++response data", response);
  //   response = res.data.message.data;
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
  return response;
};
