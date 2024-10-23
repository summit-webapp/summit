import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PostAddToCartAPI } from '../../services/api/cart-apis/add-to-cart-api';
import fetchCartListingAPI from '../../services/api/cart-apis/cart-listing-api';
import { DeleteClearCart } from '../../services/api/cart-apis/clear-cart-api';
import postPlaceOrderAPI from '../../services/api/cart-apis/place-order-api';
import { DeleteItemFromCart } from '../../services/api/cart-apis/remove-item-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token, storeToken } from '../../store/slices/auth/token-login-slice';
import { addCartList, addItemToCart, clearCart, removeItemFromCart } from '../../store/slices/cart-slices/cart-local-slice';

const useAddToCartHook = () => {
  const dispatch = useDispatch();
  const tokenFromStore: any = useSelector(get_access_token);
  const getPartyName = localStorage.getItem('party_name');
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const extractProductCodes = (data: any[]) => {
    return data?.flatMap((category) => category.orders.map((order: any) => order.item_code));
  };
  const getCartList = async (setCartListingItems: any) => {
    try {
      let cartListingData: any = await fetchCartListingAPI(SUMMIT_APP_CONFIG, tokenFromStore.token);
      if (cartListingData.data.message.msg === 'success') {
        setCartListingItems(cartListingData?.data?.message?.data);
        let cartData = extractProductCodes(cartListingData?.data?.message?.data?.categories);
        let quotationId = cartListingData?.data?.message?.data?.name;
        dispatch(addCartList({ cartData, quotationId }));
      } else {
        setCartListingItems({});
      }
      return cartListingData;
    } catch (error) {
      return;
    }
  };
  const addToCartItem = async (params: any, setCartListingItems?: any) => {
    const postDataInCart = await PostAddToCartAPI(SUMMIT_APP_CONFIG, params, tokenFromStore?.token);
    if (postDataInCart?.status === 200 && postDataInCart?.data?.message?.msg === 'success') {
      const items = params?.item_list?.map((item: any) => item?.item_code);
      dispatch(addItemToCart(items));
      postDataInCart?.data?.message?.data?.access_token && dispatch(storeToken(postDataInCart?.data?.message?.data));
      if (setCartListingItems) {
        getCartList(setCartListingItems);
      }
    } else {
      toast.error(postDataInCart?.data?.message?.error);
    }
  };
  const placeOrderAPIFunc = async (params: any, setCartListingItems: any) => {
    const placeOrder = await postPlaceOrderAPI(SUMMIT_APP_CONFIG, params, tokenFromStore?.token);
    if (placeOrder?.data?.message?.msg === 'success') {
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      setCartListingItems({});
    } else {
      toast.error('Failed to place order.');
    }
  };
  const RemoveItemCartAPIFunc = async (params: any, setCartListingItems: any) => {
    const removeCartfunc = await DeleteItemFromCart(SUMMIT_APP_CONFIG, params, tokenFromStore?.token);
    if (removeCartfunc?.data?.message?.msg === 'success') {
      dispatch(removeItemFromCart(params?.item_code));
      toast.success('Product removed from cart successfully!');
      getCartList(setCartListingItems);
    } else {
      toast.error('Failed to remove product from cart');
    }
  };
  const cLearCartAPIFunc = async (quotation_id: any, setCartListingItems: any, setClearCartLoader: any) => {
    setClearCartLoader(true);
    try {
      const clearCartfunc = await DeleteClearCart(SUMMIT_APP_CONFIG, quotation_id, tokenFromStore?.token);

      if (clearCartfunc?.status === 200) {
        dispatch(clearCart());
        setCartListingItems({});
        toast.success('Cart cleared successfully!');
      } else {
        toast.error('Failed to clear cart.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred while clearing the cart. Please try again later.');
    } finally {
      setClearCartLoader(false);
    }
  };
  return { addToCartItem, placeOrderAPIFunc, RemoveItemCartAPIFunc, cLearCartAPIFunc, getPartyName };
};
export default useAddToCartHook;
