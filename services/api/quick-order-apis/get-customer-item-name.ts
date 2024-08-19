import { executeGETAPI } from '../../../utils/http-methods';

const getCustomerItemAPI = async (appName: string, token: any, customer_name: any) => {
  let additionalParams = { ...(customer_name && { customer_name }) }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appName,
    'customer-item-api',
    'get_customer_item_by_customer_name_and_item_code',
    'customer_item_reference_code_api',
    token,
    additionalParams // Pass additional parameters if needed
  );
  return response;
};

export default getCustomerItemAPI;
