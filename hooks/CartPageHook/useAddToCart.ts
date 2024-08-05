import { useDispatch, useSelector } from 'react-redux';
import { PostAddToCartAPI } from '../../services/api/cart-apis/add-to-cart-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { addItemToCart } from '../../store/slices/cart-slices/cart-local-slice';

const useAddToCartHook = () => {
  const dispatch = useDispatch();
  const TokenFromStore: any = useSelector(get_access_token);
  const addToCartItem = async (params: any) => {
    const postDataInCart = await PostAddToCartAPI(params, TokenFromStore?.token);
    if (postDataInCart?.msg === 'success') {
      dispatch(addItemToCart(params?.item_code));
    }
  };

  return { addToCartItem };
};
export default useAddToCartHook;
