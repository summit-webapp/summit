import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const AddProductToCatalogList = async (productData:any) => {
    let response: any;
    const version = CONSTANTS.VERSION;
    const method = "put_items";
    const entity = "catalog";
    const params = `?version=${version}&method=${method}&entity=${entity}&catalog_name=${productData?.catalogNames}&item=${productData?.ItemCode}`;
    const config = {
      headers: {
        Authorization: productData.tokens,
      },
    };
  
    await axios
      .put(
        `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`,
        undefined,
        config
      )
      .then((res) => (
        response = res,
        console.log(response,"response")
        ))
      .catch((error) => console.log(error));
  
    return response;
  };
  
  export default AddProductToCatalogList;