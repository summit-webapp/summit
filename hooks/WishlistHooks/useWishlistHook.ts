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
  const { SUMMIT_API_SDK }: any = CONSTANTS;
  const wishlistCount: any = useSelector(selectWishlist)?.wislistCount;
  const TokenFromStore: any = useSelector(get_access_token);

  const wishlistData = useSelector(selectWishlist)?.items || [];

  const fetchWishlistgData: any = async () => {
    setIsLoading(true);
    try {
      const cartListingData: any = await GetWishlistData(SUMMIT_API_SDK, TokenFromStore);
      if (cartListingData?.data?.message?.msg === 'success') {
        dispatch(addWishList(cartListingData?.data?.message));
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setErrMessage(cartListingData?.data?.message?.error);
      }
      return cartListingData;
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchWishlistgData();
  }, []);

  return { wishlistData, wishlistCount, isLoading, errorMessage };
};

export default useWishlist;
