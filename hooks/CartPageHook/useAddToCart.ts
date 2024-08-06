import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PostAddToCartAPI } from '../../services/api/cart-apis/add-to-cart-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { addItemToCart, clearCart, removeItemFromCart } from '../../store/slices/cart-slices/cart-local-slice';
import postPlaceOrderAPI from '../../services/api/cart-apis/place-order-api';
import { DeleteItemFromCart } from '../../services/api/cart-apis/remove-item-api';

const useAddToCartHook = () => {
  const dispatch = useDispatch();
  const TokenFromStore: any = useSelector(get_access_token);
  const addToCartItem = async (params: any, getCartListFunc?:any) => {
    const postDataInCart = await PostAddToCartAPI(params, TokenFromStore?.token);
    if (postDataInCart?.msg === 'success') {
      toast.success('Product added to cart successfully!')
      dispatch(addItemToCart(params?.item_code));
      if(getCartListFunc){
        getCartListFunc()
      }
    }else{
      toast.error('Failed to add product to Cart.')
    }
  };
  const placeOrderAPIFunc = async (params: any) => {
    const placeOrder = await postPlaceOrderAPI(params, TokenFromStore?.token);
    if (placeOrder?.status === 200) {
      dispatch(clearCart());
      toast.success('Order placed successfully!')
    }else{
      toast.error('Failed to place order.')
    }
  };
  const RemoveItemCartAPIFunc = async (params: any, getListAPIFunc:any) => {
    const removeCartfunc = await DeleteItemFromCart(params, TokenFromStore?.token);
    if (removeCartfunc?.data?.message?.msg === 'success') {
      dispatch(removeItemFromCart(params?.item_code));
      toast.success('Product removed from cart successfully!')
      getListAPIFunc()
    }else{
      toast.error('Failed to remove product from cart')
    }
  };

  return { addToCartItem, placeOrderAPIFunc, RemoveItemCartAPIFunc };
};
export default useAddToCartHook;
