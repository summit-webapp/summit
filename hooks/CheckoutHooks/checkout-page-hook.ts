import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShippingAddress,
  shipping_address_state,
} from "../../store/slices/checkoutPage-slice/customer-shipping-address-slice";
import {
  billing_address_state,
  fetchBillingAddress,
} from "../../store/slices/checkoutPage-slice/customer-billing-address-slice";
import getTransportData from "../../services/api/checkout-page-api/transporter-code-api";
import {
  fetchOrderSummary,
  order_summary_state,
} from "../../store/slices/checkoutPage-slice/order-summary";
import getOrderSummary from "../../services/api/checkout-page-api/order-summary";
import Router from "next/router";
import * as ga from "../../lib/ga";
import { store_address_state } from "../../store/slices/checkoutPage-slice/store-customer-address-slice";
import CoponCodePostApi from "../../services/api/checkout-page-api/coupon-code-api";
import DeleteCouponCode from "../../services/api/checkout-page-api/delete-coupon-code-api";
import StoreCreditPostApi from "../../services/api/checkout-page-api/store-credit-api";
import PlaceOrderApi from "../../services/api/checkout-page-api/place-order-api";
import RedirectPayment from "../../services/api/checkout-page-api/redirect-payment-site-api";

import CouponCodePostApi from "../../services/api/checkout-page-api/coupon-code-api";
import { CONSTANTS } from "../../services/config/app-config";
import {
  cart_listing_state,
  fetchCartListing,
} from "../../store/slices/cart-listing-page-slice/cart-listing-slice";
import axios from "axios";
import CheckGuestUser from "../../services/api/auth/check-guest-login";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const UseCheckoutPageHook = () => {
  const dispatch = useDispatch<any>();
  let response: any;
  let isDealer: any;

  if (typeof window !== "undefined") {
    isDealer = localStorage.getItem("isDealer");
  }

  const [shippingAddresses, setShippingAddresses] = useState<any>([]);
  const [billingAddresses, setBillingAddresses] = useState<any>([]);
  const [isShipLoading, setIsShipLoading] = useState<any>("");
  const [isBillLoading, setBillShipLoading] = useState<any>("");
  const [transporterlist, setTransporterlist] = useState<any>();
  const [transporterState, setTransporterState] = useState<any>();
  const [initialShippingAddress, setInitialShippingAddress] = useState<any>("");
  const [initialBillingAddress, setInitialBillingAddress] = useState<any>("");
  const [Change, setChange] = useState<any>(false);
  const [selectedAddress, setselectedAddress] = useState<any>();
  const [billingCheckbox, setBillingCheckbox] = useState<any>(true);
  const [selectedState, setSelected] = useState<any>();
  const [locationState, setlocationstate] = useState("");
  const [textState, setTextstate] = useState("");
  const [transportersCharges, settransportersCharges] = useState("");
  const [orderSummary, setorderSummary] = useState<any>([]);
  const [currencySymbolForSummary, setCurrencySymbolForSummary] =
    useState<any>("");
  const [quotationId, setquotationId] = useState<any>("");
  const [deleteCoupon, setdeleteCoupon] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<any>("");
  const [couponError, setCouponerr] = useState<any>(false);
  const [couponCodeApiRes, setCouponCodeApiRes] = useState("");
  const [couponCodeToastS, setCouponCodeToastS] = useState(false);
  const [storeCredit, setStoreCredit] = useState<any>(0);
  const [placeOrderNotification, setPlaceOrderNotification] = useState(false);
  const [cartListingItems, setcartListingItems] = useState<any>([]);
  const customerShippingAddresses: any = useSelector(shipping_address_state);
  const customerBillingAddresses: any = useSelector(billing_address_state);
  const orderSummaryStore: any = useSelector(order_summary_state);
  console.log("ordersummary store", orderSummaryStore);
  const Storeaddress: any = useSelector(store_address_state);
  const cart_listing_data_store: any = useSelector(cart_listing_state);

  const TokenFromStore: any = useSelector(get_access_token);

  const config = {
    headers: {
      Authorization: TokenFromStore?.token,
    },
  };

  useEffect(() => {
    dispatch(fetchShippingAddress(TokenFromStore?.token) as any);
    dispatch(fetchBillingAddress(TokenFromStore?.token) as any);
    transporter();
    setcartListingItems(cart_listing_data_store?.data);
  }, []);

  // useEffect(() => {
  //   const CheckGuestLogin = async () => {
  //     let guestUser = await CheckGuestUser(TokenFromStore?.token);
  //     console.log("guestuser", guestUser);
  //   };
  //   CheckGuestLogin();
  // }, []);

  useEffect(() => {
    if (
      customerShippingAddresses?.isLoading === "succeeded" &&
      customerShippingAddresses?.items?.length > 0
    ) {
      setShippingAddresses([...customerShippingAddresses?.items]);

      setInitialShippingAddress(
        customerShippingAddresses?.initialShippingAddressID
      );
    } else {
      setShippingAddresses([]);

      setIsShipLoading(customerShippingAddresses?.isLoading);
    }

    if (
      customerBillingAddresses?.isLoading === "succeeded" &&
      customerBillingAddresses?.items?.length > 0
    ) {
      setBillingAddresses([...customerBillingAddresses?.items]);
      setInitialBillingAddress(
        customerBillingAddresses?.initialBillingAddressID
      );
    } else {
      setBillingAddresses([]);
      setBillShipLoading(customerBillingAddresses?.isLoading);
    }
  }, [customerShippingAddresses.items, customerBillingAddresses.items]);

  useEffect(() => {
    if (Object.keys(cart_listing_data_store?.data).length > 0) {
      const request = {
        quotationId: cart_listing_data_store?.data?.name,
        token: TokenFromStore?.token,
      };
      dispatch(fetchOrderSummary(request));
    }
  }, [cart_listing_data_store]);

  useEffect(() => {
    if (orderSummaryStore?.data?.values.length > 0) {
      setorderSummary(orderSummaryStore?.data?.values);
      setCurrencySymbolForSummary(orderSummaryStore?.data?.currency_symbol);
    }
    if (Object.keys(cart_listing_data_store?.data).length > 0) {
      setquotationId(cart_listing_data_store?.data?.name);
    }
  }, [orderSummaryStore]);

  console.log("set quotation iddd", quotationId);

  const transporter = async () => {
    await getTransportData(TokenFromStore?.token).then((response) => {
      setTransporterlist(response);
    });
  };
  const transportHandle = (e: any) => {
    setTransporterState(e?.target?.value);
  };

  const selectedVal = (e: any, id: any) => {
    setSelected(e?.target?.value);
  };

  const queryHandle = (e: any) => {
    setTextstate(e?.target?.value);
  };
  const locationHandle = (e: any) => {
    setlocationstate(e?.target?.value);
  };

  const transportCharges = (e: any) => {
    settransportersCharges(e?.target?.value);
  };

  const handleApplyCouponCode = async (e: any) => {
    console.log("coupon code bool", deleteCoupon, quotationId);
    let res: any = await CouponCodePostApi(
      quotationId,
      couponCode,
      TokenFromStore?.token
    );
    console.log("coupon code res--", res);
    if (res?.data?.message?.msg !== "error") {
      setCouponerr(false);
      setCouponCodeApiRes(res?.data?.message?.data);

      setCouponCode("");
      setdeleteCoupon(!deleteCoupon);
      const request = {
        quotationId: quotationId,
        Token: TokenFromStore?.token,
      };
      dispatch(fetchOrderSummary(request));
      // dispatch(getOrderSummary(quotationId));
    }
    if (res?.data?.message?.msg === "error") {
      setCouponerr(true);
      setCouponCodeApiRes(res?.data?.message?.error);
    } else {
      setCouponerr(false);
    }
  };

  const handleDeleteCouponCode = async () => {
    let res = await DeleteCouponCode(quotationId, TokenFromStore?.token);
    if (res?.data?.message?.msg !== "error") {
      setCouponerr(true);
      setCouponCodeApiRes(" ");
      setdeleteCoupon(false);
      const request = {
        quotationId: quotationId,
        Token: TokenFromStore?.token,
      };
      dispatch(fetchOrderSummary(request));

      setCouponCodeToastS(!couponCodeToastS);
    }
  };
  const handleStoreCredit = async (e: any) => {
    e.preventDefault();
    console.log("store Credit", storeCredit);
    let res = await StoreCreditPostApi(storeCredit, TokenFromStore?.token);
    console.log("store response", quotationId);
    if (res?.data?.message?.msg !== "error") {
      const request = {
        quotationId: quotationId,
        Token: TokenFromStore?.token,
      };
      dispatch(fetchOrderSummary(request));
    }
  };

  const handlePlaceOrder = async () => {
    console.log(
      "place order in tq start",
      cartListingItems?.name,
      initialShippingAddress,
      initialBillingAddress,
      selectedState,
      textState,
      transporterState,
      transportCharges
    );
    console.log("payment gateway ordersummary", orderSummary);
    if (CONSTANTS.ALLOW_PAYMENT_GATEWAY === true) {
      console.log("payment gateway");
      let paymentApiRes = await RedirectPayment(
        cartListingItems?.name,
        orderSummary[10]?.value,
        "Quotation",
        TokenFromStore?.token
      );

      console.log("redirect payment", paymentApiRes);
      if (paymentApiRes?.data?.message !== "error") {
        response = paymentApiRes?.data?.message;
        window.location.href = `${paymentApiRes}`;
      }
    } else {
      let res = await PlaceOrderApi(
        cartListingItems?.name,
        initialShippingAddress,
        initialBillingAddress,
        selectedState,
        textState,
        locationState,
        transporterState,
        transportersCharges,
        TokenFromStore?.token
      );
      console.log("place order res", res);

      if (res?.data?.message !== "error") {
        response = res?.data?.message;

        Router.push(`/thankyou/${response}`);
      }
    }
  };

  const handleChangeSameAsShipping = (checkboxValue: boolean) => {
    if (checkboxValue) {
      setBillingCheckbox(!billingCheckbox);
      setInitialBillingAddress(initialShippingAddress);
    } else {
      setBillingCheckbox(!billingCheckbox);
      setInitialBillingAddress(
        customerBillingAddresses.initialBillingAddressID
      );
    }
  };

  console.log("address after set hook end", orderSummary);

  const handleShipping = (e: any) => {
    setChange(true);
    setselectedAddress(e?.target?.value);
  };

  return {
    shippingAddresses,
    billingAddresses,
    initialShippingAddress,
    setInitialShippingAddress,
    setInitialBillingAddress,
    initialBillingAddress,
    selectedAddress,
    Change,
    handleShipping,
    handleChangeSameAsShipping,
    billingCheckbox,
    setBillingCheckbox,
    isShipLoading,
    isBillLoading,
    transporterlist,
    transporterState,
    transportHandle,
    selectedVal,
    selectedState,
    queryHandle,
    locationHandle,
    transportCharges,
    locationState,
    textState,
    transportersCharges,
    orderSummary,
    quotationId,
    couponCode,
    deleteCoupon,
    setCouponCode,
    handleApplyCouponCode,
    handleDeleteCouponCode,
    couponCodeApiRes,
    couponError,
    setStoreCredit,
    handleStoreCredit,
    handlePlaceOrder,
    storeCredit,
    currencySymbolForSummary,
  };
};

export default UseCheckoutPageHook;
