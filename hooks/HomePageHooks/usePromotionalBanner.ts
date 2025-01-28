import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import promotionalBannerAPI from '../../services/api/home-page-apis/promotional-banner-api';
const usePromotionalBanner = () => {
  const [promotionalBannerData, setPromotionalBannerData] = useState<any>([]);

  const tokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();

  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const fetchPromotionalBannerData = async () => {
    let getPromotionalBannerData: any;
    const fields = ['title', 'image', 'description', 'sequence'];

    setIsLoading(true);
    try {
      getPromotionalBannerData = await promotionalBannerAPI(SUMMIT_APP_CONFIG, fields, tokenFromStore?.token);
      if (getPromotionalBannerData?.status === 200) {
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
