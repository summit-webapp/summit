import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { addWishList } from '../../store/slices/wishlist-slices/wishlist-local-slice';
import { fetchWishlistUser, wishlist_state } from '../../store/slices/wishlist-slices/wishlist-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useWishlist = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const dispatch = useDispatch();

  const wishlistStoreData: any = useSelector(wishlist_state);
  const TokenFromStore: any = useSelector(get_access_token);

  const [wishlistData, setWishlistData] = useState<any>([]);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  useEffect(() => {
    const wishListRequest = {
      getWishlist: true,
      deleteWishlist: false,
      addTowishlist: false,
      token: TokenFromStore?.token,
    };
    dispatch(fetchWishlistUser(wishListRequest));
  }, []);
  useEffect(() => {
    setWishlistCount(wishlistStoreData?.user?.wishlist_count);
    setIsLoading(wishlistStoreData?.isLoading);
    setErrMessage(wishlistStoreData?.error);
    if (wishlistStoreData?.user?.data?.length > 0) {
      setWishlistData([...wishlistStoreData?.user?.data]); 
      if( typeof(wishlistStoreData?.user?.data) === 'object' )   {

        dispatch(addWishList(wishlistStoreData?.user));
      }
    } else {
      if (wishlistStoreData?.user?.data?.length === 0) {
        setWishlistData([]);
      }
    }
  }, [wishlistStoreData]);

  return { wishlistData, wishlistCount, isLoading, errorMessage };
};

export default useWishlist;
