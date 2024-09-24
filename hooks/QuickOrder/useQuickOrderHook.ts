import { useSelector, useDispatch } from 'react-redux';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { useState } from 'react';
import {
  fetchQuickOrderData,
  selectQuickOrderState,
  clearQuickOrderData,
  removeItem,
  updateQuickOrderData,
} from '../../store/slices/quick-order-slice/quick-order-slice';
import useAddToCartHook from '../CartPageHook/useAddToCart';

const useQuickOrderHook = () => {
  const dispatch = useDispatch();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const [itemExist, setItemExist] = useState('');
  const TokenFromStore: any = useSelector(get_access_token);
  const [itemCode, setItemCode] = useState<any>('');
  const { data, loading, error } = useSelector(selectQuickOrderState);
  const { addToCartItem, getPartyName } = useAddToCartHook();

  const handleAddProduct = () => {
    if (data?.length > 25) {
      setItemExist('You can add only 25 items in quick order.');
    }
    console.log(data?.map((item) => item.name));
    if (itemCode) {
      const itemExists = data?.some((item: any) => item?.name === itemCode);
      if (itemExists) {
        setItemExist('Item Already Exist');
        setTimeout(() => {
          setItemExist('');
        }, 2000);
        return;
      }
    }
    const params = {
      [CONSTANTS.QUICK_ORDER_FIELD]: itemCode,
    };
    const token = TokenFromStore?.token;

    dispatch(fetchQuickOrderData({ SUMMIT_APP_CONFIG, params, token }) as any);
    setItemCode('');
  };
  const clearQuickOrder = () => {
    dispatch(clearQuickOrderData());
  };
  const removeItemFromQucikList = (item: any) => {
    dispatch(removeItem(item));
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleAddProduct();
    }
  };
  const handleQuantityChange = (itemCode: any, qtyValue: any) => {
    const updatedData: any =
      data?.length > 0 &&
      data?.map((item: any) => {
        if (item?.name === itemCode) {
          return {
            ...item,
            min_order_qty: qtyValue, // change with the original min qty value
          };
        }
        return item;
      });
    dispatch(updateQuickOrderData(updatedData));
  };
  const addItemsToDCart = () => {
    const addToCartParams = {
      currency: 'INR',
      item_list: data?.map((item) => ({ itemCode: item?.item_code, quantity: item?.min_order_qty || 1 })),
      party_name: getPartyName,
    };
    addToCartItem(addToCartParams, null);
    dispatch(clearQuickOrderData());
  };

  return {
    data,
    loading,
    error,
    itemCode,
    itemExist,
    setItemCode,
    handleKeyDown,
    handleAddProduct,
    clearQuickOrder,
    removeItemFromQucikList,
    addItemsToDCart,
    handleQuantityChange,
  };
};

export default useQuickOrderHook;
