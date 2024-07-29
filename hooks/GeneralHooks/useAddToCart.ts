import { useSelector } from 'react-redux';
import { PostAddToCartAPI } from '../../services/api/cart-apis/add-to-cart-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';

const useAddToCartHook = () => {
  const TokenFromStore: any = useSelector(get_access_token);
  const addToCartItem = async (params: any) => {
    const postDataInCart = await PostAddToCartAPI(params, TokenFromStore?.token);
  };

  return { addToCartItem };
};
export default useAddToCartHook;
