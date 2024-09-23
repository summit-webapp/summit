import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import fetchOrderSummaryAPI from '../../services/api/checkout/get-order-summary-api';
import PostApplyCouponAPI from '../../services/api/discounts/apply-coupon-code-api';
import PostApplyStoreCreditAPI from '../../services/api/discounts/apply-store-credite-api';
import DeleteCouponAPI from '../../services/api/discounts/delete-coupon-code-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useOrderSummary = (quotationId: string) => {
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const tokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();

  const [orderSummary, setOrderSummary] = useState<any>({});
  const [storeCredit, setStoreCredit] = useState<any>('');
  const [couponCode, setCouponCode] = useState<any>('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const getOrderSummary = async (quotationId: string) => {
    setIsLoading(true);
    try {
      let orderSummaryData: any = await fetchOrderSummaryAPI(SUMMIT_APP_CONFIG, quotationId, tokenFromStore.token);
      if (orderSummaryData?.status === 200 && orderSummaryData?.data?.message?.msg === 'success') {
        setOrderSummary(orderSummaryData?.data?.message?.data);
        orderSummaryData?.data?.message?.data?.values?.forEach((item: { name: string; value: number | string }) => {
          if (item?.name === 'Store Credit' && item?.value !== 0) {
            setStoreCredit(item.value);
          }
          if (item?.name === 'Coupon Code' && item?.value !== null) {
            setCouponCode(item.value);
            setIsCouponApplied(true);
          }
        });
      } else {
        setOrderSummary({});
        setErrMessage(orderSummaryData?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage('Failed to fetch Order Summary Data');
    } finally {
      setIsLoading(false);
    }
  };
  const handleChangeStoreCredit = (value: any) => {
    setStoreCredit(value);
  };
  const handleChangeCouponCode = (value: any) => {
    setCouponCode(value);
  };
  const handleApplyStoreCredit = async () => {
    const params = {
      store_credit: storeCredit,
    };
    if (storeCredit !== '') {
      const applyStoreCredit = await PostApplyStoreCreditAPI(SUMMIT_APP_CONFIG, params, tokenFromStore?.token);
      if (applyStoreCredit?.data?.message?.msg === 'success') {
        toast.success('Store Credit applied sucessfully!');
        setTimeout(() => {
          getOrderSummary(quotationId);
        }, 1000);
      } else {
        toast.error(applyStoreCredit?.data?.message?.error);
      }
    } else {
      toast.error('Please enter store credit');
    }
  };
  const handleApplyCouponCode = async () => {
    const params = {
      id: quotationId,
      coupon_code: couponCode,
    };
    if (couponCode !== '') {
      const applyCouponCode = await PostApplyCouponAPI(SUMMIT_APP_CONFIG, params, tokenFromStore?.token);
      if (applyCouponCode?.data?.message?.msg === 'success') {
        toast.success('Coupon code applied sucessfully!');
        setIsCouponApplied(true);
        setTimeout(() => {
          getOrderSummary(quotationId);
        }, 1000);
      } else {
        toast.error(applyCouponCode?.data?.message?.error);
      }
    } else {
      toast.error('Please enter valid coupon code');
    }
  };
  const handleRemoveCouponCode = async () => {
    const params = {
      id: quotationId,
    };
    const newCatalog = await DeleteCouponAPI(SUMMIT_APP_CONFIG, params, tokenFromStore?.token);
    if (newCatalog?.data?.message?.msg === 'success') {
      toast.success('Coupon code removed sucessfully');
      setCouponCode('');
      setIsCouponApplied(false);
      setTimeout(() => {
        getOrderSummary(quotationId);
      }, 1000);
    } else {
      toast.error(newCatalog?.message?.error);
    }
  };

  useEffect(() => {
    if (quotationId) {
      getOrderSummary(quotationId);
    }
  }, [quotationId]);
  return {
    orderSummaryLoading: isLoading,
    orderSummaryError: errorMessage,
    orderSummary,
    storeCredit,
    couponCode,
    handleChangeCouponCode,
    handleChangeStoreCredit,
    isCouponApplied,
    handleApplyCouponCode,
    handleApplyStoreCredit,
    handleRemoveCouponCode,
  };
};

export default useOrderSummary;
