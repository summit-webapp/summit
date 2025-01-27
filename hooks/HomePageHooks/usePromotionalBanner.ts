import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { currency_selector_state } from '../../store/slices/general_slices/multi-currency-slice';
import promotionalBannerAPI from '../../services/api/home-page-apis/promotional-banner-api';
const usePromotionalBanner = () => {
  // const [promotionalBannerData, setPromotionalBannerData] = useState<any>([]);
  // const tokenFromStore: any = useSelector(get_access_token);
  // const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  // const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  // const fetchPromotionalBannerData = async () => {
  //   let getPromotionalBannerData: any;
  //   setIsLoading(true);
  //   try {
  //     getPromotionalBannerData = await promotionalBannerData(SUMMIT_APP_CONFIG, tokenFromStore?.token);
  //     if (getPromotionalBannerData?.status === 200 && getPromotionalBannerData?.data?.msg === 'success') {
  //       setPromotionalBannerData(getPromotionalBannerData?.data?.data);
  //     } else {
  //       setErrMessage('No Data Found');
  //     }
  //   } catch (error) {
  //     setErrMessage('No Data Found');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchPromotionalBannerData();
  // }, []);
  // return { isLoading, promotionalBannerData, errorMessage };
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const tokenFromStore: any = useSelector(get_access_token);
  const [selectedCurrencyVal, setSelectedVal] = useState();
  const [promotionalBannerData, setPromotionalBannerData] = useState<any>([]);

  useEffect(() => {
    setSelectedVal(currency_state_from_redux?.selected_currency_value);
  }, [currency_state_from_redux]);
  const fetchPromotionalBannerData = async () => {
    let getPromotionalBannerData: any;
    setIsLoading(true);
    const fields = ['title', 'image', 'description', 'sequence'];
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
  return { promotionalBannerData, isLoading, errorMessage };
};

export default usePromotionalBanner;
