import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchOrderListing,
  order_listing_state,
} from "../../store/slices/order-listing-page-slice/order-listing-page-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
import { cart_listing_state } from "../../store/slices/cart-listing-page-slice/cart-listing-slice";

const UseCartOrderHistory = () => {
  const dispatch = useDispatch();
  const [orderHistoryItems, setOrderHistoryItems] = useState<any>([]);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const [Loadings, setLoadings] = useState("");

  const OrderListingProducts = useSelector(order_listing_state);
  const TokenFromStore: any = useSelector(get_access_token);

  const order_listing_data_store = useSelector(order_listing_state);

  console.log("orderlisting data from store", OrderListingProducts);
  const [history, setHistory] = useState("this_month");
  const handleHistoryDate = (e: any) => {
    setHistory(e.target.value);
  };

  useEffect(() => {
    const reqParams = {
      date: history,
      id: "",
      token: TokenFromStore?.token,
    };
    dispatch(FetchOrderListing(reqParams));
    // dispatch(FetchOrderListing(history, "", TokenFromStore?.token));
  }, [history]);
  // useEffect(()=>{
  //     dispatch(FetchOrderListing("this_month"))
  // },[])

  useEffect(() => {
    if (OrderListingProducts?.data?.length > 0) {
      setOrderHistoryItems(OrderListingProducts.data);
      setLoadingStatus(false);
    } else {
      setOrderHistoryItems([]);
    }
  }, [OrderListingProducts]);

  // useEffect(() => {
  //   setLoadings(order_listing_data_store?.isLoading);
  //   if (order_listing_data_store?.data !== "") {
  //     order_listing_state(order_listing_data_store?.data);
  //     let storeItemCodeAndItemQty: any = [];
  //     order_listing_data_store?.data?.categories?.map((category: any) => {
  //       category?.orders?.map((order: any) => {
  //         storeItemCodeAndItemQty.push({
  //           item_code: order?.item_code,
  //           quantity: order?.qty,
  //         });
  //       });
  //     });
  //     setOrderHistoryItems([...storeItemCodeAndItemQty]);
  //   }
  // }, [order_listing_data_store]);

  useEffect(() => {
    setLoadingStatus(true);
    if (
      OrderListingProducts?.data?.length < 0 &&
      OrderListingProducts?.isLoading === "pending"
    ) {
      setLoadingStatus(true);
    } else if (
      OrderListingProducts?.data?.length > 0 &&
      OrderListingProducts?.isLoading === "succeeded"
    ) {
      setOrderHistoryItems(OrderListingProducts?.data);
      setLoadingStatus(false);
    } else if (
      OrderListingProducts?.data?.length < 0 &&
      OrderListingProducts?.isLoading === "succeeded"
    ) {
      setLoadingStatus(false);
      setOrderHistoryItems([]);
    } else if (OrderListingProducts?.isLoading === "succeeded") {
      setLoadingStatus(false);
    }
  }, [OrderListingProducts]);

  return {
    orderHistoryItems,
    handleHistoryDate,
    history,
    loadingStatus,
    Loadings,
    
  };
};

export default UseCartOrderHistory;
