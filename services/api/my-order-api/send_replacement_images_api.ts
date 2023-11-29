import axios from "axios";
import { CONSTANTS } from "../../config/app-config";



const SendReturnReplacementAPI = async (return_replacement:string, description:string, order_id:string, product_id:string, images:any) =>
{
    console.log("my orders in send api",order_id);
    let response:any;

    const config = {
        headers: {
          Accept: 'application/json'
        },
        withCredentials:true
      };
    const raw_data: any = {
      version: "v1",
      method: "return_replace_item",
      entity: "order",
      return_replacement: return_replacement,
      description: description,
      order_id: order_id,
      product_id:product_id,
      images: images,
    };
    await axios.post(`${CONSTANTS.API_BASE_URL}/api/method/sportnetwork.api.map.version_mapper`, raw_data, config).then((res)=>{
        console.log(res.data.message.msg);
        response = res?.data?.message?.msg; 
    }).catch(err=>console.log(err))

    return response;

    // console.log("my orders send images api res", api_res);
}

export default SendReturnReplacementAPI