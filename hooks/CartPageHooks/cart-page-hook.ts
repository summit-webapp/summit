import { useDispatch, useSelector } from "react-redux";
import {
  cart_listing_state,
  fetchCartListing,
} from "../../store/slices/cart-listing-page-slice/cart-listing-slice";
import { useEffect, useState } from "react";
import {
  fetchOrderSummary,
  order_summary_state,
} from "../../store/slices/checkoutPage-slice/order-summary";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const UseCartPageHook = () => {
  const dispatch = useDispatch();
  const orderSummaryStore: any = useSelector(order_summary_state);
  const [cartListingItems, setCartListingItems] = useState<any>([]);
  const [orderSummaryForCart, setOrderSummaryForCart] = useState<any>([]);
  const [Loadings, setLoadings] = useState("");

  const cart_listing_data_store = useSelector(cart_listing_state);
  console.log("cart Listing from store", cart_listing_data_store);

  const TokenFromStore: any = useSelector(get_access_token);

  useEffect(() => {
    dispatch(fetchCartListing(TokenFromStore?.token));
    if (Object.keys(cart_listing_data_store?.data).length > 0) {
      const request = {
        quotationId: cart_listing_data_store?.data?.name,
        token: TokenFromStore?.token,
      };
      dispatch(fetchOrderSummary(request));
    }
  }, []);

  useEffect(() => {
    setLoadings(cart_listing_data_store?.isLoading);
    if (cart_listing_data_store?.data !== "") {
      setCartListingItems(cart_listing_data_store?.data);
    }
  }, [cart_listing_data_store]);

  useEffect(() => {
    if (orderSummaryStore?.data?.values.length > 0) {
      setOrderSummaryForCart(orderSummaryStore?.data?.values);
    }
  }, [orderSummaryStore]);

  return {
    cartListingItems,
    orderSummaryForCart,
    setCartListingItems,
    Loadings,
  };
};

export default UseCartPageHook;
