import { useSelector } from 'react-redux';
import postAddToCartApi from '../../services/api/product-detail-page-api/add-to-cart-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';

const useAddToCartHook = () => {
  const TokenFromStore: any = useSelector(get_access_token);
  const addToCartItem = async (params: any) => {
    const postDataInCart = await postAddToCartApi(params, TokenFromStore?.token);
    console.log(postDataInCart,'@cart post data')
  };

  return { addToCartItem };
};
export default useAddToCartHook;
