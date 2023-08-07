import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchOrderListing,
  order_listing_state,
} from "../../store/slices/order-listing-page-slice/order-listing-page-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const UseCartOrderHistory = () => {
  const dispatch = useDispatch();
  const [orderHistoryItems, setOrderHistoryItems] = useState<any>([]);

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
    } else {
      setOrderHistoryItems([]);
    }
  }, [OrderListingProducts]);

  console.log("orderlisting hook end", orderHistoryItems);
  return {
    orderHistoryItems,
    handleHistoryDate,
    history,
  };
};

export default UseCartOrderHistory;
