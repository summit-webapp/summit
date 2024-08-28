import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetWishlistData } from '../../services/api/wishlist-apis/wishlist-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { addWishList, selectWishlist } from '../../store/slices/wishlist-slices/wishlist-local-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { CONSTANTS } from '../../services/config/app-config';

const useWishlist = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const dispatch = useDispatch();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const wishlistCount: any = useSelector(selectWishlist)?.wislistCount;
  const TokenFromStore: any = useSelector(get_access_token);

  const wishlistData = useSelector(selectWishlist)?.items || [];

  const fetchWishlistData: any = async () => {
    setIsLoading(true);
    try {
      const wishlistData: any = await GetWishlistData(SUMMIT_APP_CONFIG, TokenFromStore?.token);
      if (wishlistData?.data?.message?.msg === 'success') {
        dispatch(addWishList(wishlistData?.data?.message));
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setErrMessage(wishlistData?.data?.message?.error);
      }
      return wishlistData;
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchWishlistData();
  }, []);

  return { wishlistData, wishlistCount, isLoading, errorMessage };
};

export default useWishlist;
