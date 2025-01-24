import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getBlogDataAPI from '../../services/api/home-page-apis/blog-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
const useHomeBlogData = () => {
  const [blogData, setBlogData] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const fetchBlogData = async () => {
    let getBlogData: any;
    setIsLoading(true);
    try {
      getBlogData = await getBlogDataAPI(SUMMIT_APP_CONFIG, tokenFromStore?.token);
      if (getBlogData?.status === 200 && getBlogData?.data?.message?.msg === 'success') {
        setBlogData(getBlogData?.data?.message?.data);
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
    fetchBlogData();
  }, []);
  return { isLoading, blogData, errorMessage };
};

export default useHomeBlogData;