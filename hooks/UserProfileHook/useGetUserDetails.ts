import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { CONSTANTS } from '../../services/config/app-config';
import getUserDetailsAPI from '../../services/api/user/get-user-detail-api';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useGetUserDetails = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const [userData, setUserData] = useState<any>({});
  const tokenFromStore: any = useSelector(get_access_token);

  const fetchUserDetails: any = async () => {
    let userDetails: any;
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
      userDetails = await getUserDetailsAPI(SUMMIT_APP_CONFIG, tokenFromStore.token);
      if (userDetails?.status === 200 && userDetails?.data?.message?.msg === 'success') {
        setUserData(userDetails?.data?.message?.data);
      } else {
        setErrMessage(userDetails?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage(userDetails?.data?.message?.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return { userData, isLoading, errorMessage };
};

export default useGetUserDetails;
