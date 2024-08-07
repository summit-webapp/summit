import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PostAddToCartAPI } from '../../services/api/cart-apis/add-to-cart-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { addCartList, addItemToCart, clearCart, removeItemFromCart } from '../../store/slices/cart-slices/cart-local-slice';
import postPlaceOrderAPI from '../../services/api/cart-apis/place-order-api';
import { DeleteItemFromCart } from '../../services/api/cart-apis/remove-item-api';
import fetchCartListingAPI from '../../services/api/cart-apis/cart-listing-api';

const useAddToCartHook = () => {
  const dispatch = useDispatch();
  const TokenFromStore: any = useSelector(get_access_token);
  const extractProductCodes = (data: any[]) => {
    return data?.flatMap((category) => category.orders.map((order: any) => order.item_code));
  };
  const getCartList = async (setCartListingItems: any) => {
    try {
      let cartListingData: any = await fetchCartListingAPI(TokenFromStore.token);
      if (cartListingData.data.message.msg === 'success') {
        setCartListingItems(cartListingData?.data?.message?.data);
        let cartData = extractProductCodes(cartListingData?.data?.message?.data?.categories);
        dispatch(addCartList(cartData));
      } else {
        setCartListingItems([]);
      }
      return cartListingData;
    } catch (error) {
      return;
    }
  };
  const addToCartItem = async (params: any, setCartListingItems?: any) => {
    const postDataInCart = await PostAddToCartAPI(params, TokenFromStore?.token);
    if (postDataInCart?.msg === 'success') {
      dispatch(addItemToCart(params?.item_code));
      if (setCartListingItems) {
        getCartList(setCartListingItems);
        toast.success('Product updated successfully!');
      } else {
        toast.success('Product added to cart successfully!');
      }
    } else {
      toast.error('Failed to add product to Cart.');
    }
  };
  const placeOrderAPIFunc = async (params: any,setCartListingItems:any) => {
    const placeOrder = await postPlaceOrderAPI(params, TokenFromStore?.token);
    if (placeOrder?.status === 200) {
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      setCartListingItems([])
    } else {
      toast.error('Failed to place order.');
    }
  };
  const RemoveItemCartAPIFunc = async (params: any, setCartListingItems: any) => {
    const removeCartfunc = await DeleteItemFromCart(params, TokenFromStore?.token);
    if (removeCartfunc?.data?.message?.msg === 'success') {
      dispatch(removeItemFromCart(params?.item_code));
      toast.success('Product removed from cart successfully!');
      getCartList(setCartListingItems);
    } else {
      toast.error('Failed to remove product from cart');
    }
  };

  return { addToCartItem, placeOrderAPIFunc, RemoveItemCartAPIFunc };
};
export default useAddToCartHook;
