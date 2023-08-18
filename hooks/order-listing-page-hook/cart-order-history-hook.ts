import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchOrderListing,
  order_listing_state,
} from "../../store/slices/order-listing-page-slice/order-listing-page-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const UseCartOrderHistory = () => {
  const dispatch = useDispatch();
  const [orderHistoryItems, setOrderHistoryItems] = useState<any>([]);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);

  const OrderListingProducts = useSelector(order_listing_state);
  const TokenFromStore: any = useSelector(get_access_token);

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
  };
};

export default UseCartOrderHistory;
