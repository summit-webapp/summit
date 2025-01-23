import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getBlogDataAPI from '../../services/api/home-page-apis/blog-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
const useHomeBlogData = () => {
  const [blogData, setBlogData] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();

  const fetchBlogData = async () => {
    const params: any = ['name', 'published_on', 'blog_intro', 'title'];
    let getBlogData: any;
    setIsLoading(true);
    try {
      getBlogData = await getBlogDataAPI(params, tokenFromStore?.token);
      if (getBlogData?.status === 200 && getBlogData?.data?.data?.length > 0) {
        setBlogData(getBlogData?.data?.data);
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
