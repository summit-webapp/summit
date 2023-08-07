import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import { client } from "../general_apis/cookie-instance-api";

const PlaceOrderApi = async (
  cart: any,
  shippingdAddress: any,
  billingAddress: any,
  selectedState?: any,
  textState?: any,
  locationState?: any,
  transporterState?: any,
  transportersCharges?: any,
  token?: any
) => {
  let response: any;

  const version = CONSTANTS.VERSION;
  const method = "place_order";
  const entity = "order";

  const vals = selectedState == 1 ? selectedState : "";
  const door_deliveryState = selectedState == 0 ? selectedState : "";

  const order_id = cart;
  const shipping_address_id = shippingdAddress;
  const billing_address_id = billingAddress;
  const transporter = transporterState;
  const godown_delivery = vals;
  const door_delivery = door_deliveryState;
  const location = locationState;
  const remarks = textState;
  const transport_charges = transportersCharges;

  const params = `?version=${version}&method=${method}&entity=${entity}&order_id=${order_id}&shipping_address_id=${shipping_address_id}&billing_address_id=${billing_address_id}&transporter=${transporter}&godown_delivery=${godown_delivery}&door_delivery=${door_delivery}&location=${location}&remarks=${remarks}&transport_charges=${transport_charges}`;


  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`,
      undefined,
      { ...config, timeout: 5000 }
    )
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
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

  return response;
  //   return await client.post(
  //     `${CONSTANTS.API_BASE_URL}/&order_id=${cart}&shipping_address_id=${shippingdAddress}&billing_address_id=${billingAddress}&transporter=${transporterState}&godown_delivery=${vals}&door_delivery=${door_delivery}&location=${locationState}&remarks=${textState}&transport_charges=${transportersCharges}`,
  //     undefined,
  //     config
  //   );
};

export default PlaceOrderApi;
