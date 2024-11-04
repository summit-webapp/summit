import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AddProductToWishlist, DeleteProductFromWishlist } from '../../services/api/wishlist-apis/wishlist-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { addItemToWishlist, removeItemFromWishlist } from '../../store/slices/wishlist-slices/wishlist-local-slice';

const useAddToWishlist = () => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  const dispatch = useDispatch();
  const TokenFromStore: any = useSelector(get_access_token);
  const handleAddToWishList = async (item: any) => {
    const params = {
      item_code: item?.name,
    };
    const addItem = await AddProductToWishlist(SUMMIT_APP_CONFIG, params, TokenFromStore?.token);
    if (addItem?.data?.message?.msg === 'success') {
      dispatch(addItemToWishlist(item));
    } else {
      toast.error(addItem?.data?.message?.error);
    }
  };
  const handleRemoveFromWishList = async (item_code: any) => {
    const params = {
      item_code,
    };
    const removeItem = await DeleteProductFromWishlist(SUMMIT_APP_CONFIG, params, TokenFromStore?.token);
    if (removeItem?.data?.message?.msg === 'success') {
      dispatch(removeItemFromWishlist(item_code));
    } else {
      toast.error(removeItem?.data?.message?.error);
    }
  };

  return { handleAddToWishList, handleRemoveFromWishList };
};

export default useAddToWishlist;
