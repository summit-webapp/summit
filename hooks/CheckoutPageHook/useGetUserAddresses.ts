import { useEffect, useState } from 'react';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import fetchUserAddressAPI from '../../services/api/checkout/get-user-addresses-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { useSelector } from 'react-redux';

const useGetUserAddresses = () => {
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const tokenFromStore: any = useSelector(get_access_token);

  // Separate state for Shipping and Billing
  const [shippingAddressLoading, setShippingAddessLoading] = useState(false);
  const [billingAddressLoading, setBillingAddressLoading] = useState(false);

  const [shippingAddressError, setShippingAddressError] = useState<string | null>(null);
  const [billingAddressError, setBillingAddressError] = useState<string | null>(null);

  const [shippingAddress, setShippingAddress] = useState<any>([]);
  const [billingAddress, setBillingAddress] = useState<any>([]);
  const fetchUserShippingAddress = async () => {
    setShippingAddessLoading(true);
    try {
      let userShippingAddressData: any = await fetchUserAddressAPI(SUMMIT_APP_CONFIG, 'Shipping', tokenFromStore.token);
      if (userShippingAddressData?.status === 200 && userShippingAddressData?.data?.message?.msg === 'success') {
        setShippingAddress([...userShippingAddressData?.data?.message?.data]);
      } else {
        setShippingAddress([]);
        setShippingAddressError(userShippingAddressData?.data?.message?.error);
      }
    } catch (error) {
      setShippingAddressError('Failed to fetch Shipping Address data.');
    } finally {
      setShippingAddessLoading(false);
    }
  };
  const fetchUserBillingAddress = async () => {
    setBillingAddressLoading(true);
    try {
      let userShippingAddressData: any = await fetchUserAddressAPI(SUMMIT_APP_CONFIG, 'Billing', tokenFromStore.token);
      if (userShippingAddressData?.status === 200 && userShippingAddressData?.data?.message?.msg === 'success') {
        setBillingAddress([...userShippingAddressData?.data?.message?.data]);
      } else {
        setBillingAddress([]);
        setBillingAddressError(userShippingAddressData?.data?.message?.error);
      }
    } catch (error) {
      setBillingAddressError('Failed to fetch Billing Address data.');
    } finally {
      setBillingAddressLoading(false);
    }
  };
  useEffect(() => {
    fetchUserShippingAddress();
    fetchUserBillingAddress();
  }, []);
  return {
    shippingAddressLoading,
    billingAddressLoading,
    shippingAddressError,
    billingAddressError,
    fetchUserShippingAddress,
    fetchUserBillingAddress,
    shippingAddress,
    billingAddress,
  };
};

export default useGetUserAddresses;
