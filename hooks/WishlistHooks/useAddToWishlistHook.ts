import { useDispatch, useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { AddProductToWishlist, DeleteProductFromWishlist } from '../../services/api/wishlist-apis/wishlist-api';
import { addItemToWishlist, removeItemFromWishlist } from '../../store/slices/wishlist-slices/wishlist-local-slice';

const useAddToWishlist = () => {
  const dispatch = useDispatch();
  const TokenFromStore: any = useSelector(get_access_token);
  const handleAddToWishList = async (item: any) => {
    const params = {
      token: TokenFromStore?.token,
      prod_id: item?.name,
    };
    const addItem = await AddProductToWishlist(params);
    if (addItem?.data?.message?.msg === 'success') {
      dispatch(addItemToWishlist(item));
    }
  };
  const handleRemoveFromWishList = async (item_code: any) => {
    const params = {
      token: TokenFromStore?.token,
      prod_id: item_code,
    };
    const removeItem = await DeleteProductFromWishlist(params);
    if (removeItem?.msg === 'success') {
      dispatch(removeItemFromWishlist(item_code));
    }
  };

  return { handleAddToWishList, handleRemoveFromWishList };
};

export default useAddToWishlist;
