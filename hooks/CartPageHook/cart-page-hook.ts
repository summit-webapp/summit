import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {PostAddToCartAPI} from '../../services/api/cart-apis/add-to-cart-api';
import fetchCartListingAPI from '../../services/api/cart-apis/cart-listing-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
// import { fetchOrderSummary, order_summary_state } from '../../store/slices/checkoutPage-slice/order-summary';
import { currency_selector_state } from '../../store/slices/general_slices/multi-currency-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { addCartList } from '../../store/slices/cart-slices/cart-local-slice';
const useCartPageHook = () => {
  const dispatch = useDispatch();
//   const orderSummaryStore: any = useSelector(order_summary_state);
  const [cartListingItems, setCartListingItems] = useState<any>([]);
  const [arrayofSelectedItems, setArrayOfSelectedItems] = useState<any>([]);
  const [orderSummaryForCart, setOrderSummaryForCart] = useState<any>([]);
  const [Loadings, setLoadings] = useState('');
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const tokenFromStore: any = useSelector(get_access_token);
  const updateCart = (item_code: string, input_value: string) => {
    if (input_value === '') {
      const updatedItems = arrayofSelectedItems?.map((item: any) => {
        if (item.item_code === item_code) {
          return { ...item, quantity: '' };
        }
        return item;
      });
      setArrayOfSelectedItems(updatedItems);
    } else {
      const updatedItems = arrayofSelectedItems?.map((item: any) => {
        if (item.item_code === item_code) {
          return { ...item, quantity: parseInt(input_value) }; // Convert input_value to integer
        }
        return item;
      });
      setArrayOfSelectedItems(updatedItems);
    }
  };
  const callUpdateCartAPI = async () => {
    const updateCartAPI = await PostAddToCartAPI(arrayofSelectedItems, currency_state_from_redux?.selected_currency_value, tokenFromStore?.token);
    if (updateCartAPI?.msg === 'success') {
      // showToast('Your cart has been updated', 'success');
      fetchCartListingData()
    }
  };
  const extractProductCodes = (data: any[]) => {
    return data?.flatMap(category =>
      category.orders.map((order:any) => order.item_code)
    );
  };
  const fetchCartListingData: any = async () => {
    setIsLoading(true)
    try {
      let cartListingData: any = await fetchCartListingAPI(tokenFromStore.token)
      if (cartListingData.data.message.msg === "success") {
        setCartListingItems(cartListingData?.data?.message?.data)
        let cartData = extractProductCodes(cartListingData?.data?.message?.data?.categories)
        dispatch(addCartList(cartData))
        setIsLoading(false);
      } else {
        setCartListingItems([])
        setIsLoading(false);
        setErrMessage(cartListingData?.data?.message?.error);
      }
      const orderSummaryParams = {
        quotationId: cartListingData.data?.message?.data?.name,
        token: tokenFromStore?.token,
      };
    //   dispatch(fetchOrderSummary(orderSumsmaryParams));
      return cartListingData
    } catch (error) {
      return
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchCartListingData()
  }, []);
  // useEffect(() => {
  //   setLoadings(cart_listing_data_store?.isLoading);
  //   if (cart_listing_data_store?.data !== '') {
  //     setCartListingItems(cart_listing_data_store?.data);
  //     let storeItemCodeAndItemQty: any = [];
  //     cart_listing_data_store?.data?.categories?.map((category: any) => {
  //       category?.orders?.map((order: any) => {
  //         storeItemCodeAndItemQty.push({
  //           item_code: order?.item_code,
  //           quantity: order?.qty,
  //         });
  //       });
  //     });
  //     setArrayOfSelectedItems([...storeItemCodeAndItemQty]);
  //   }
  // }, [cart_listing_data_store]);
//   useEffect(() => {
//     if (orderSummaryStore?.data?.values.length > 0) {
//       setOrderSummaryForCart(orderSummaryStore?.data?.values);
//     }
//   }, [orderSummaryStore]);
  return {
    cartListingItems,
    arrayofSelectedItems,
    callUpdateCartAPI,
    updateCart,
    orderSummaryForCart,
    setCartListingItems,
    Loadings,
    isLoading,
    errorMessage
  };
};
export default useCartPageHook;