import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import {
  clearQuickOrderData,
  fetchQuickOrderData,
  removeItem,
  selectQuickOrderState,
  updateItemQuantity,
} from '../../store/slices/quick-order-slice/quick-order-slice';
import useAddToCartHook from '../CartPageHook/useAddToCart';

const useQuickOrderHook = () => {
  const dispatch = useDispatch();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const [itemExist, setItemExist] = useState('');
  const TokenFromStore: any = useSelector(get_access_token);
  const { data, loading, error, itemList } = useSelector(selectQuickOrderState);
  const { addToCartItem, getPartyName } = useAddToCartHook();
  const [itemCode, setItemCode] = useState<any>('');

  const handleAddProduct = () => {
    if (itemList?.length > 25) {
      setItemExist('You can add only 25 items in quick order.');
      return;
    }

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

  const removeItemFromQucikList = (itemCode: any) => {
    console.log(itemCode, 'itemCode');
    dispatch(removeItem(itemCode));
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleAddProduct();
    }
  };

  const handleQuantityChange = (itemCode: any, qtyValue: any) => {
    const localItem = itemList?.find((itemValue: any) => itemValue.item_code === itemCode);
    const minOrderItem = data?.find((item: any) => item?.name === itemCode);
    // Ensure both localItem and minOrderItem are found
    if (!localItem || !minOrderItem) {
      console.log('Item not found in lists.');
      return;
    }
    const minOrderQty = minOrderItem.min_order_qty;
    const currentQty = localItem.quantity;

    console.log(currentQty, localItem);
    if (currentQty < minOrderQty) {
      return 'doneee';
    }
    const quantity = Number(qtyValue);
    if (!isNaN(quantity) && quantity > 0) {
      dispatch(updateItemQuantity({ item_code: itemCode, quantity }));
    }
  };

  const addItemsToDCart = () => {
    const addToCartParams = {
      currency: 'INR',
      item_list: itemList,
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
    itemList,
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
