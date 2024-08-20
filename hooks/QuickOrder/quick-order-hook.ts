import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { addItemToCart } from '../../store/slices/cart-slices/cart-local-slice';
import { CONSTANTS } from '../../services/config/app-config';
import getCustomerItemAPI from '../../services/api/quick-order-apis/get-customer-item-name';
import postQuickOrderAPI from '../../services/api/quick-order-apis/post-quick-order';

const useQuickOrder = () => {
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const tokenFromStore: any = useSelector(get_access_token);
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('');
  const [qtySizeInput, setQtySizeInput] = useState<any>('');
  const [quickOrderData, setQuickOrderData] = useState<any>([]);
  const [customerName, setCustomerName] = useState<any>('');
  const [refCodesList, setRefCodesList] = useState<any>([]);
  const [disableInputField, setDisabledInputField] = useState<boolean>(true);

  const purity: any = localStorage.getItem('localPurity');
  let user: any = localStorage.getItem('user');
  const handleInputChange = (e: any, field: any) => {
    let inputValue: any = e.target.value;
    if (field === 'qty_size') {
      setQtySizeInput(inputValue);
    } else if (field === 'customer_name') {
      setCustomerName(inputValue);
    }
  };

  const handleCustomerName: any = async () => {
    let refCodesList: any = await getCustomerItemAPI(SUMMIT_APP_CONFIG, tokenFromStore?.token, customerName);
    if (refCodesList?.data?.message?.msg === 'success' && refCodesList?.data?.message?.data?.length > 0) {
      setRefCodesList(refCodesList?.data?.message?.data);
      setDisabledInputField(false);
    } else {
      setRefCodesList([]);
    }
  };
  const handleSaveBtn: any = () => {
    if (Object.keys(qtySizeInput)?.length > 0 || inputValue) {
      const ordersArray = qtySizeInput.split(',').map((order: any) => {
        const [size, qty] = order.split('/');
        return { size: parseInt(size), qty: parseInt(qty) };
      });

      const newRecord = { item_code: inputValue, qty_size_list: ordersArray };
      setQuickOrderData((prevData: any) => [...prevData, newRecord]);
      setInputValue('');
      setQtySizeInput('');
    }
  };

  const handleDltQuickOrderRecord: any = (id: any) => {
    const updatedRecord: any = quickOrderData.filter((data: any, index: any) => index !== id);
    setQuickOrderData(updatedRecord);
  };

  const handleSubmitBtn: any = async () => {
    const values: any = {
      customer_name: customerName,
      purity: purity,
      user: user,
      items: quickOrderData,
    };
    let createQuickOrderRecord: any = await postQuickOrderAPI(values);
    if (createQuickOrderRecord?.data?.message?.msg === 'success' && createQuickOrderRecord?.data?.message?.data?.includes('Quotation')) {
      const item_codes = quickOrderData?.map((item: any) => item.item_code)
      setQuickOrderData([]);
      item_codes?.map((code: any) => dispatch(addItemToCart(code)))
      toast.success('Quotation Created Successfully!');
    } else {
      toast.error('Something went wrong while creating Quotation. Please try again.');
    }
  };

  return {
    handleSaveBtn,
    quickOrderData,
    handleInputChange,
    inputValue,
    setInputValue,
    qtySizeInput,
    handleSubmitBtn,
    handleDltQuickOrderRecord,
    customerName,
    handleCustomerName,
    refCodesList,
    disableInputField,
  };
};

export default useQuickOrder;
