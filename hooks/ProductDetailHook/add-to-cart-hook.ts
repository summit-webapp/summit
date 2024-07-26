import { useSelector } from 'react-redux';
import AddToCartApi from '../../services/api/cart-page-api/add-to-cart-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';

const useAddToCartHook = () => {
  const TokenFromStore: any = useSelector(get_access_token);
  const addToCartItem = async (params: any) => {
    console.log(params,'@cart')
    const postDataInCart = await AddToCartApi(params, TokenFromStore?.token);
    console.log(postDataInCart,'@cart post data')
  };

  return { addToCartItem };
};
export default useAddToCartHook;
