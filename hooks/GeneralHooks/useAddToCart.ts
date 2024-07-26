import { useSelector } from 'react-redux';
import AddToCartApi from '../../services/api/general-apis/post-add-items-to-cart-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';

const useAddToCartHook = () => {
  const TokenFromStore: any = useSelector(get_access_token);
  const addToCartItem = async (params: any) => {
    const postDataInCart = await AddToCartApi(params, TokenFromStore?.token);
  };

  return { addToCartItem };
};
export default useAddToCartHook;
