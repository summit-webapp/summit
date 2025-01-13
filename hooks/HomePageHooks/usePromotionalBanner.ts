import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
const usePromotionalBanner = () => {
  const [promotionalBannerData, setPromotionalBannerData] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const fetchPromotionalBannerData = async () => {
    let getPromotionalBannerData: any;
    setIsLoading(true);
    try {
      getPromotionalBannerData = await promotionalBannerData(SUMMIT_APP_CONFIG, tokenFromStore?.token);
      if (getPromotionalBannerData?.status === 200 && getPromotionalBannerData?.data?.msg === 'success') {
        setPromotionalBannerData(getPromotionalBannerData?.data?.data);
      } else {
        setErrMessage('No Data Found');
      }
    } catch (error) {
      setErrMessage('No Data Found');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotionalBannerData();
  }, []);
  return { isLoading, promotionalBannerData, errorMessage };
};

export default usePromotionalBanner;
