import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const deleteItemFromCatalog = async (catalogParams:any) => {
    console.log(catalogParams,"catalogParams")
    let response: any;
    const version = CONSTANTS.VERSION;
    const method = "delete_items";
    const entity = "catalog";
    const params = `?version=${version}&method=${method}&entity=${entity}&catalog_name=${catalogParams?.catalog_name}&item=${catalogParams?.item_name}`;
    const config = {
      headers: {
        Authorization: catalogParams?.token,
      },
    };
  
    await axios.delete(
        `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`,
        config
      )
      .then((res) => (response = res.data))
      .catch((error) => console.log(error));
  
    return response;
  };
  
  export default deleteItemFromCatalog;