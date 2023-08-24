import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS } from "../../services/config/app-config";
import { fetchCartListing } from "../../store/slices/cart-listing-page-slice/cart-listing-slice";
import GetCartHistory from "../../services/api/my-order-api/order-history-api";
import SalesOrderIdFetch from "../../services/api/my-order-api/get-sales-order-id";
import ECommerceEnhancedCodeApi from "../../services/api/my-order-api/e-commerce-enhanced-api";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
import { order_listing_state } from "../../store/slices/order-listing-page-slice/order-listing-page-slice";

const UseThankyou = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [detail, setdetail] = useState([]);
  const [ecommerceData, setEcommerceData] = useState({});
  const TokenFromStore: any = useSelector(get_access_token);

  useEffect(() => {
    if (router.asPath.split("/")[1] === "thankyou") {
      console.log("thank u b2c");
      const getOrderDetail = async () => {
        const fetchID = await SalesOrderIdFetch(TokenFromStore?.token);
        // setId(fetchID);
        const reqParams = {
          date: "",
          id: fetchID,
          token: TokenFromStore?.token,
        };
        const getOrderDetailData = await GetCartHistory(reqParams);

        setdetail(getOrderDetailData);
      };
      getOrderDetail();
    } else {
      const getSalesOrderID = async () => {
        console.log("thank u b2b");

        let ecommerce_enhanced_code = await ECommerceEnhancedCodeApi(
          router?.query.id,
          TokenFromStore?.token
        );

        setEcommerceData({ ...ecommerce_enhanced_code });
        const requestParams = {
          date: "",
          id: router?.query.id,
          token: TokenFromStore?.token,
        };

        if (requestParams?.id !== undefined) {
          const getOrderDetailData = await GetCartHistory(requestParams);
          console.log("thank u b2b detail", getOrderDetailData);
          setdetail(getOrderDetailData);
          dispatch(fetchCartListing(TokenFromStore?.token));
        }
      };
      getSalesOrderID();
    }
  }, [router]);

  return { id, detail };
};

export default UseThankyou;
