import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import getBreadcrumbsDataFromAPI from '../../services/api/general-apis/breadcrumbs-api';
import useHandleStateUpdate from './handle-state-update-hook';
import { CONSTANTS } from '../../services/config/app-config';
import useAuthErrorHandler from '../AuthHooks/handleAuthError';

const UseBreadCrumbsHook = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const router = useRouter();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const { query }: any = useRouter();
  const [breadCrumbData, setBreadCrumbData] = useState([]);
  const TokenFromStore: any = useSelector(get_access_token);
  const handleAuthError = useAuthErrorHandler();
  
  const url = router.asPath;
  const baseUrl = url.split('?')[0];
  const splitURL = baseUrl.split('/').join(',').split('%20').join(',').split(',');
  const fetchBreadcrumbDataAPI = async (requestParams: any) => {
    setIsLoading(true);
    try {
      const breadcrumbDataAPI: any = await getBreadcrumbsDataFromAPI(SUMMIT_APP_CONFIG, requestParams, TokenFromStore?.token);
      if (breadcrumbDataAPI?.status == 200 && breadcrumbDataAPI?.data?.message?.msg === 'success' && breadcrumbDataAPI?.data?.message?.data?.length) {
        setBreadCrumbData(breadcrumbDataAPI?.data?.message?.data);
      } else {
        setBreadCrumbData([]);
        handleAuthError(breadcrumbDataAPI, setIsLoading, setErrMessage);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const requestParams = {
      url: splitURL,
    };
    fetchBreadcrumbDataAPI(requestParams);
  }, [query]);

  return { breadCrumbData, isLoading, errorMessage };
};

export default UseBreadCrumbsHook;
