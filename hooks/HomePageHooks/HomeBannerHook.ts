import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getHomeBannerDataFromAPI from '../../services/api/general_apis/banner-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';

const useHomeBanner = () => {
  const tokenFromStore: any = useSelector(get_access_token);

  const [homeBannerData, setHomeBannerData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchHomeBannerDataFromAPI: any = async () => {
    setIsLoading(true);
    try {
      const homeBannerDataAPI: any = await getHomeBannerDataFromAPI(tokenFromStore?.token);

      if (homeBannerDataAPI?.data?.message?.msg === 'success' && homeBannerDataAPI?.data?.message?.data?.length) {
        setHomeBannerData(
          [...homeBannerDataAPI?.data?.message?.data].sort(function (a: any, b: any) {
            return a.sequence - b.sequence;
          })
        );
      } else {
        setHomeBannerData([]);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeBannerDataFromAPI();
  }, []);

  return { homeBannerData, isLoading };
};
export default useHomeBanner;
