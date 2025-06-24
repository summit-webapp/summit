import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getBannerAPI from '../../services/api/home-page-apis/banner-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { CONSTANTS } from '../../services/config/app-config';
import useAuthErrorHandler from '../AuthHooks/handleAuthError';

const useBanner = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const [bannersList, setBannersList] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);
  const handleAuthError = useAuthErrorHandler();
  
  const fetchBannerDataFunction = async () => {
    let getBannerData: any;
    setIsLoading(true);
    try {
      getBannerData = await getBannerAPI(SUMMIT_APP_CONFIG, tokenFromStore?.token);
      if (getBannerData?.status === 200 && getBannerData?.data?.msg === 'success') {
        setBannersList(getBannerData?.data?.data);
      } else {
        handleAuthError(getBannerData, setIsLoading, setErrMessage);
      }
    } catch (error) {
      handleAuthError(error, setIsLoading, setErrMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerDataFunction();
  }, []);

  return {
    bannersList,
    isLoading,
    errorMessage,
  };
};

export default useBanner;
