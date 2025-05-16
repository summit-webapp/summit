import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { CONSTANTS } from '../../services/config/app-config';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import getWebsiteUserListAPI from '../../services/api/user/get-website-user-list-api';
import getMechanicListAPI from '../../services/api/user/get-mechanic-list-api';

const useMechanicList = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const [mechanicList, setMechanicList] = useState<any>({});
  const tokenFromStore: any = useSelector(get_access_token);

  const fetchMechanicList: any = async () => {
    let mechanicList: any;
    setIsLoading(true);

    /**
     * Fetches user details from the API using the given token.
     *
     * @async
     * @function getMechanicListAPI
     * @param {Object} SUMMIT_APP_CONFIG - The Summit API SDK object used to interact with the API.
     * @param {string} token - The authentication token obtained from the store.
     * @returns {Promise<void>} - Resolves when the API response is handled.
     * @throws {Error} Throws an error if the API call fails.
     */
    try {
      mechanicList = await getMechanicListAPI(SUMMIT_APP_CONFIG, tokenFromStore.token);
      if (mechanicList?.status === 200 && mechanicList?.data?.message?.msg === 'success') {
        setMechanicList(mechanicList?.data?.message?.data);
      } else {
        setErrMessage(mechanicList?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage(mechanicList?.data?.message?.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMechanicList();
  }, []);

  return { mechanicList, isLoading, errorMessage };
};

export default useMechanicList;
