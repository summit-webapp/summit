import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { CONSTANTS } from '../../services/config/app-config';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import getWebsiteUserListAPI from '../../services/api/user/get-website-user-list-api';

const useWebsiteUserList = (type: any) => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const [websiteUserList, setWebsiteUserList] = useState<any>({});
  const tokenFromStore: any = useSelector(get_access_token);

  const fetchuseWebsiteUserListList: any = async () => {
    let websiteUserList: any;
    setIsLoading(true);

    /**
     * Fetches user details from the API using the given token.
     *
     * @async
     * @function getUserDetailsAPI
     * @param {Object} SUMMIT_APP_CONFIG - The Summit API SDK object used to interact with the API.
     * @param {string} token - The authentication token obtained from the store.
     * @returns {Promise<void>} - Resolves when the API response is handled.
     * @throws {Error} Throws an error if the API call fails.
     */
    try {
      websiteUserList = await getWebsiteUserListAPI(SUMMIT_APP_CONFIG, type, tokenFromStore.token);
      console.log('websiteUserList', websiteUserList);
      if (websiteUserList?.status === 200 && websiteUserList?.data?.message?.msg === 'success') {
        setWebsiteUserList(websiteUserList?.data?.message?.data);
      } else {
        setErrMessage(websiteUserList?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage(websiteUserList?.data?.message?.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchuseWebsiteUserListList();
  }, [type]);

  return { websiteUserList, isLoading, errorMessage };
};

export default useWebsiteUserList;
