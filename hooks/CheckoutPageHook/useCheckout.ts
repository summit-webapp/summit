import { useState } from 'react';
import useFetchCartItems from '../CartPageHook/useFetchCartItems';
import useGetStatesData from '../GeneralHooks/useGetStateList';
import useOrderSummary from './useGetOrderSummary';
import useGetTransportersList from './useGetTransportersList';
import useGetUserAddresses from './useGetUserAddresses';

const useCheckout = () => {
  const { cartListingItems } = useFetchCartItems();
  const { shippingAddressLoading, shippingAddressError, shippingAddress, billingAddressLoading, billingAddressError, billingAddress } =
    useGetUserAddresses();
  const { transportersListLoading, transportersListErr, transportersList } = useGetTransportersList();
  const { orderSummaryLoading, orderSummaryError, orderSummary } = useOrderSummary(cartListingItems?.name);
  const { statesListLoading, statesListError, stateList } = useGetStatesData();

  const [orderObj, setOrderObj] = useState({
    party_name: '',
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

  const handlePlaceOrder = () => {};
};

export default useCheckout;
