import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { GetWishlistDataFetch } from '../../services/api/wishlist-apis/wishlist-api';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useWishlist = () => {
  const TokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const [wishlistData, setWishlistData] = useState([]);
  const fetchWishlistDataFun = async () => {
    const params = {
      token: TokenFromStore?.token,
    };
    setIsLoading(true);
    try {
      const getWishlistApi: any = await GetWishlistDataFetch(params);
      if (getWishlistApi?.data?.message?.msg === "success") {
        setWishlistData(getWishlistApi?.data?.message?.data);
        setErrMessage([]);
      } else {
        setWishlistData([]);
        setErrMessage(getWishlistApi?.data?.message?.data?.error);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchWishlistDataFun();
  }, []);
  return {isLoading, wishlistData, errorMessage };
};

export default useWishlist;
