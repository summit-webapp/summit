import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS } from "../../services/config/app-config";
import { fetchCartListing } from "../../store/slices/cart-listing-page-slice/cart-listing-slice";
import GetCartHistory from "../../services/api/my-order-api/order-history-api";
import SalesOrderIdFetch from "../../services/api/my-order-api/get-sales-order-id";
import ECommerceEnhancedCodeApi from "../../services/api/my-order-api/e-commerce-enhanced-api";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const UseThankyou = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [detail, setdetail] = useState([]);
  const [ecommerceData, setEcommerceData] = useState({});
  const TokenFromStore: any = useSelector(get_access_token)


  useEffect(() => {
    if (router.asPath.split("/")[1] !== "thankyou") {
      // console.log("in my order")
      const getOrderDetail = async () => {
        const getOrderDetailData = await GetCartHistory("", router?.query.id, TokenFromStore?.token);
        console.log(
          "get sales order data for order detail",
          getOrderDetailData
        );
        setdetail(getOrderDetailData);
      };
      getOrderDetail();
    } else {
      const getSalesOrderID = async () => {
        const fetchID = await SalesOrderIdFetch(TokenFromStore?.token);
        console.log(" get fetch Id", fetchID);
        setId(fetchID);

        let ecommerce_enhanced_code = await ECommerceEnhancedCodeApi(fetchID, TokenFromStore?.token);
        console.log(
          "e-commerce enhanced code api res",
          ecommerce_enhanced_code
        );
        setEcommerceData({ ...ecommerce_enhanced_code });
        const getOrderDetailData = await GetCartHistory("", fetchID, TokenFromStore?.token);
        console.log(
          "get sales order data for order detail",
          getOrderDetailData
        );
        setdetail(getOrderDetailData);
        dispatch(fetchCartListing(TokenFromStore?.token));
      };
      getSalesOrderID();
    }
  }, [router]);

  return { id, detail };
};

export default UseThankyou;
