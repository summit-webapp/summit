import { useState } from 'react';
import useFetchCartItems from '../CartPageHook/useFetchCartItems';
import useGetStatesData from '../GeneralHooks/useGetStateList';
import useOrderSummary from './useGetOrderSummary';
import useGetTransportersList from './useGetTransportersList';
import useGetUserAddresses from './useGetUserAddresses';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import { CONSTANTS } from '../../services/config/app-config';
import { PostAddToCartAPI } from '../../services/api/cart-apis/add-to-cart-api';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { toast } from 'react-toastify';
import postPlaceOrderAPI from '../../services/api/cart-apis/place-order-api';

const useCheckout = () => {
  const { cartListingItems } = useFetchCartItems();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const tokenFromStore: any = useSelector(get_access_token);
  const { shippingAddressLoading, shippingAddressError, shippingAddress, billingAddressLoading, billingAddressError, billingAddress } =
    useGetUserAddresses();
  const { transportersListLoading, transportersListErr, transportersList } = useGetTransportersList();
  const { orderSummaryLoading, orderSummaryError, orderSummary } = useOrderSummary(cartListingItems?.name);
  const quotationId = useSelector(selectCart).quotation_Id;
  const { statesListLoading, statesListError, stateList } = useGetStatesData();
  const partyName = localStorage.getItem('party_name');
  const [orderObj, setOrderObj] = useState({
    order_id: '',
    party_name: partyName,
    shipping_address_id: '',
    billing_address_id: '',
    transporter: '',
    godown_delivery: '',
    door_delivery: '',
    location: '',
    remarks: '',
  });

  const handleUserAddressChange = (addressType: string, addressName: string) => {
    if (addressType === 'Shipping') {
      setOrderObj((prevObj) => ({ ...prevObj, shipping_address_id: addressName }));
    } else {
      setOrderObj((prevObj) => ({ ...prevObj, billing_address_id: addressName }));
    }
  };

  const handlePlaceOrder = async (billingAddress: string, shippingAddress: any, showBillingAddress: any) => {
    const params = {
      ...orderObj,
      shipping_address_id: shippingAddress,
      billing_address_id: showBillingAddress ? shippingAddress : billingAddress,
      order_id: cartListingItems.name,
    };
    console.log(params, 'params');
    try {
      let orderPlace: any = await postPlaceOrderAPI(SUMMIT_APP_CONFIG, params, tokenFromStore.token);
      if (orderPlace?.status === 200 && orderPlace?.data?.message?.msg === 'success') {
        // setOrderSummary(orderSummaryData?.data?.message?.data);
        toast.success('Order place sucessfully!');
      } else {
        // setOrderSummary({});
        toast.error('Error ');
        setErrMessage(orderPlace?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage('Failed to fetch Order Summary Data');
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handlePlaceOrder,
  };
};

export default useCheckout;
