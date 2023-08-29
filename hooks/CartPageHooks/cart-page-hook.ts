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
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";
import AddToCartApi from "../../services/api/cart-page-api/add-to-cart-api";
import {
  hideToast,
  successmsg,
} from "../../store/slices/general_slices/toast_notification_slice";
import { showToast } from "../../components/ToastNotificationNew";

const UseCartPageHook = () => {
  const dispatch = useDispatch();
  const orderSummaryStore: any = useSelector(order_summary_state);
  const [cartListingItems, setCartListingItems] = useState<any>([]);
  const [arrayofSelectedItems, setArrayOfSelectedItems] = useState<any>([]);
  const [orderSummaryForCart, setOrderSummaryForCart] = useState<any>([]);
  const [Loadings, setLoadings] = useState("");

  const cart_listing_data_store = useSelector(cart_listing_state);

  const currency_state_from_redux: any = useSelector(currency_selector_state);
  console.log("cart Listing from store", cart_listing_data_store);

  const TokenFromStore: any = useSelector(get_access_token);

  const updateCart = (item_code: string, input_value: string) => {
    if (input_value === "") {
      console.log("update empty");
      const updatedItems = arrayofSelectedItems?.map((item: any) => {
        if (item.item_code === item_code) {
          return { ...item, quantity: "" };
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
    const updateCartAPI = await AddToCartApi(
      arrayofSelectedItems,
      currency_state_from_redux?.selected_currency_value,
      TokenFromStore?.token
    );
    if (updateCartAPI?.msg === "success") {
      showToast("Your cart has been updated", "success");
    }
  };

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
      let storeItemCodeAndItemQty: any = [];
      cart_listing_data_store?.data?.categories?.map((category: any) => {
        category?.orders?.map((order: any) => {
          storeItemCodeAndItemQty.push({
            item_code: order?.item_code,
            quantity: order?.qty,
          });
        });
      });
      setArrayOfSelectedItems([...storeItemCodeAndItemQty]);
    }
  }, [cart_listing_data_store]);

  useEffect(() => {
    if (orderSummaryStore?.data?.values.length > 0) {
      setOrderSummaryForCart(orderSummaryStore?.data?.values);
    }
  }, [orderSummaryStore]);

  return {
    cartListingItems,
    arrayofSelectedItems,
    callUpdateCartAPI,
    updateCart,
    orderSummaryForCart,
    setCartListingItems,
    Loadings,
  };
};

export default UseCartPageHook;
