import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchOrderListing,
  order_listing_state,
} from "../../store/slices/order-listing-page-slice/order-listing-page-slice";

const UseCartOrderHistory = () => {
  const [orderHistoryItems, setOrderHistoryItems] = useState<any>([]);

  const OrderListingProducts = useSelector(order_listing_state);

  console.log("orderlisting data from store", OrderListingProducts);

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
  };
};

export default UseCartOrderHistory;
