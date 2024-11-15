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
  const [minQuntityWarning, setMinQuantityWarning] = useState({});

  const handleAddProduct = () => {
    if (itemList?.length > 25) {
      setItemExist('You can add only 25 items in quick order.');
      return;
    }
    if (itemCode) {
      const itemExists = data?.some((item: any) => item?.oem_part_number === itemCode);
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
    setMinQuantityWarning('');
    setItemCode('');
    dispatch(clearQuickOrderData());
  };

  const removeItemFromQucikList = (itemCode: any) => {
    setMinQuantityWarning('');
    dispatch(removeItem(itemCode));
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleAddProduct();
    }
  };

  const handleQuantityChange = (itemCode: any, qtyValue: any, item: any) => {
    const quantity = Number(qtyValue);
    if (!isNaN(quantity) && quantity > 0) {
      const minQuantCheck = item?.min_order_qty < 1 ? 1 : item?.min_order_qty;
      if (quantity < minQuantCheck) {
        return setMinQuantityWarning({ warning: ` MIN QTY ${item?.min_order_qty}!! `, itemCode: itemCode });
      } else {
        setMinQuantityWarning('');
        return dispatch(updateItemQuantity({ item_code: itemCode, quantity }));
      }
    } else {
      return setMinQuantityWarning({ warning: 'Invalid Input!!', itemCode: itemCode });
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
    minQuntityWarning,
    handleKeyDown,
    handleAddProduct,
    clearQuickOrder,
    removeItemFromQucikList,
    addItemsToDCart,
    handleQuantityChange,
  };
};

export default useQuickOrderHook;
