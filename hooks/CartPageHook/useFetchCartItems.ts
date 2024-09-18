import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchCartListingAPI from '../../services/api/cart-apis/cart-listing-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { addCartList, selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { CONSTANTS } from '../../services/config/app-config';
const useFetchCartItems = () => {
  const dispatch = useDispatch();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const [cartListingItems, setCartListingItems] = useState<any>({});
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const tokenFromStore: any = useSelector(get_access_token);
  const { cartCount } = useSelector(selectCart);

  const extractProductCodes = (data: any[]) => {
    return data?.flatMap((category) => category.orders.map((order: any) => order.item_code));
  };
  const fetchCartListingData: any = async () => {
    setIsLoading(true);
    try {
      let cartListingData: any = await fetchCartListingAPI(SUMMIT_APP_CONFIG, tokenFromStore.token);
      if (cartListingData?.status === 200 && cartListingData?.data?.message?.msg === 'success') {
        if (Object.keys(cartListingData?.data?.message?.data).length !== 0) {
          setCartListingItems(cartListingData?.data?.message?.data);
          let cartData = extractProductCodes(cartListingData?.data?.message?.data?.categories);
          let quotationId = cartListingData?.data?.message?.data?.name;
          dispatch(addCartList({ cartData, quotationId }));
        } else {
          setCartListingItems({});
        }
      } else {
        setCartListingItems({});
        setErrMessage(cartListingData?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage('Failed to fetch cart listing data.');
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
    fetchCartListingData,
  };
};
export default useFetchCartItems;
