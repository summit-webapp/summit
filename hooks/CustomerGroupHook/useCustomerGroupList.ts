import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { CONSTANTS } from '../../services/config/app-config';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import getCustomerGroupListAPI from '../../services/api/customer-group-list-apis/get-customer-group-list-api';

const useCustomerGroupList = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const [customerGroupList, setCustomerGroupList] = useState<any>({});
  const tokenFromStore: any = useSelector(get_access_token);

  const fetchCustomerGroupList: any = async () => {
    let customerGroupList: any;
    setIsLoading(true);

    /**
     * Fetches customer group list from the API using the given token.
     *
     * @async
     * @function fetchCustomerGroupList
     * @param {Object} SUMMIT_APP_CONFIG - The Summit API SDK object used to interact with the API.
     * @param {string} token - The authentication token obtained from the store.
     * @returns {Promise<void>} - Resolves when the API response is handled.
     * @throws {Error} Throws an error if the API call fails.
     */
    try {
      customerGroupList = await getCustomerGroupListAPI(SUMMIT_APP_CONFIG, tokenFromStore.token);
      console.log('customerGroupList', customerGroupList);
      if (customerGroupList?.status === 200 && customerGroupList?.data?.message?.msg === 'success') {
        setCustomerGroupList(customerGroupList?.data?.message?.data);
      } else {
        setErrMessage(customerGroupList?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage(customerGroupList?.data?.message?.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerGroupList();
  }, []);

  return { customerGroupList, isLoading, errorMessage };
};

export default useCustomerGroupList;
