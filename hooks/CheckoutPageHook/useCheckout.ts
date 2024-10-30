import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { POSTOrderPlaceAPI } from '../../services/api/checkout/post-order-api';
import { PostRazorpayAPI } from '../../services/api/checkout/post-razorpay-payment-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { clearCart } from '../../store/slices/cart-slices/cart-local-slice';
import useFetchCartItems from '../CartPageHook/useFetchCartItems';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import useGetStatesData from '../GeneralHooks/useGetStateList';

const useCheckout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartListingItems, fetchCartListingData } = useFetchCartItems();
  const { SUMMIT_APP_CONFIG, ENABLE_PAYMENT_INTEGRATION }: any = CONSTANTS;
  const tokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { statesListLoading, statesListError, stateList } = useGetStatesData();
  const [showLocation, setShowLocation] = useState(false);
  const [orderObj, setOrderObj] = useState({
    order_id: '',
    party_name: localStorage.getItem('party_name'),
    shipping_address_id: '',
    billing_address_id: '',
    transporter: '',
    godown_delivery: '',
    door_delivery: '',
    location: '',
    remarks: '',
  });

  const handleUserAddressChange = (e: any, delivery_type?: any) => {
    const { name, value } = e.target;
    if (delivery_type) {
      setOrderObj((prevObj) => ({ ...prevObj, [delivery_type]: 1 }));
      if (delivery_type === 'godown_delivery') {
        setShowLocation(!showLocation);
      } else {
        setShowLocation(false);
      }
    } else {
      setOrderObj((prevObj) => ({ ...prevObj, [name]: value }));
    }
  };

  const handlePlaceOrder = async (billingAddress: string, shippingAddress: any, showBillingAddress: any, setPlacePrderLoader: any) => {
    if (ENABLE_PAYMENT_INTEGRATION) {
      const param = {
        payment_gateway: 'Razorpay',
        document_type: 'Quotation',
        amount: cartListingItems?.grand_total_including_tax,
        order_id: cartListingItems?.name,
      };
      setPlacePrderLoader(true);
      try {
        let RazorOrderPlace: any = await PostRazorpayAPI(SUMMIT_APP_CONFIG, param, tokenFromStore.token);

        if (RazorOrderPlace?.status === 200 && RazorOrderPlace?.data?.message !== 'error') {
          fetchCartListingData();
          dispatch(clearCart());
          window.location.href = `${RazorOrderPlace?.data?.message}`;
        } else {
          // setOrderSummary({});
          toast.error('Error ');
          setErrMessage(RazorOrderPlace?.data?.message?.error);
        }
      } catch (error) {
        setErrMessage('Failed to place order');
      } finally {
        setPlacePrderLoader(false);
      }
    } else {
      const params = {
        ...orderObj,
        party_name: localStorage.getItem('party_name') || '',
        shipping_address_id: shippingAddress,
        billing_address_id: showBillingAddress ? shippingAddress : billingAddress,
        order_id: cartListingItems.name,
      };
      try {
        let orderPlace: any = await POSTOrderPlaceAPI(SUMMIT_APP_CONFIG, params, tokenFromStore.token);
        if (orderPlace?.status === 200) {
          // setOrderSummary(orderSummaryData?.data?.message?.data);
          // toast.success('Order place sucessfully!');
          router.push('/my-orders');
          fetchCartListingData();
          dispatch(clearCart());
        } else {
          // setOrderSummary({});
          toast.error(orderPlace?.data?.message?.error);
          setErrMessage(orderPlace?.data?.message?.error);
        }
      } catch (error) {
        setErrMessage('Failed to place order');
      } finally {
        setIsLoading(false);
      }
    }
  };
  return {
    handlePlaceOrder,
    stateList,
    handleUserAddressChange,
    showLocation,
  };
};

export default useCheckout;
