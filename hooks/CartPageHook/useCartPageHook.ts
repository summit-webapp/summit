import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchCartListingAPI from '../../services/api/cart-apis/cart-listing-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { addCartList, selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
const useCartPage = () => {
  const dispatch = useDispatch();
  const [cartListingItems, setCartListingItems] = useState<any>([]);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const tokenFromStore: any = useSelector(get_access_token);
  const cartCount = useSelector(selectCart)?.cartCount;

  const extractProductCodes = (data: any[]) => {
    return data?.flatMap((category) => category.orders.map((order: any) => order.item_code));
  };
  const fetchCartListingData: any = async () => {
    setIsLoading(true);
    try {
      let cartListingData: any = await fetchCartListingAPI(tokenFromStore.token);
      if (cartListingData.data.message.msg === 'success') {
        setCartListingItems(cartListingData?.data?.message?.data);
        let cartData = extractProductCodes(cartListingData?.data?.message?.data?.categories);
        dispatch(addCartList(cartData));
        setIsLoading(false);
        setErrMessage('');
      } else {
        setCartListingItems([]);
        setIsLoading(false);
        setErrMessage(cartListingData?.data?.message?.error);
      }
      return cartListingData;
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCartListingData();
  }, []);

  return {
    cartListingItems,
    setCartListingItems,
    isLoading,
    errorMessage,
    cartCount,
  };
};
export default useCartPage;
