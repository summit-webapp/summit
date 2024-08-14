import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { callGetAPI } from '../../utils/http-methods';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { CONSTANTS } from '../../services/config/app-config';
import useBunchOrder from './bunch-order-hook';
import useCustomMarketOrder from './custom-market-order-hook';
import useMarketOrder from './market-order-hook';

const useBulkOrder = () => {
  const TokenFromStore: any = useSelector(get_access_token);

  const initialQty = () => Array.from({ length: 24 }, () => ({ qty: '', size: '' }));

  const initialFormData = {
    purity: '',
    transaction_date: '',
    delivery_date: '',
    description: '',
    customer: '',
    company: '',
    currency: '',
    marketOrderDetails: [
      {
        item_code: '',
        description: '',
        uom: '',
        qty: initialQty(),
      },
    ],
    customMarketOrderDetails: [
      {
        item_code: '',
        qty: [{ qty: '', size: '' }],
        description: '',
        uom: '',
      },
    ],
    bunchOrderDetails: [
      {
        item_code: '',
        qty: [{ qty: '', size: '' }],
        description: '',
        uom: '',
        bunch_weight: '',
        weight_per_unit: '',
        estimate_bunch_weight: '',
        is_bunch: '',
      },
    ],
  };

  const [formData, setFormData] = useState<any>(initialFormData);
  const [purityValues, setPurityValues] = useState([]);
  const [refCodesList, setRefCodesList] = useState<any>([]);
  const { errMsgMarketOrder, addMarketOrderRow, deleteMarketOrderRow, handleChangeMarketOrder } = useMarketOrder(formData, setFormData);
  const { errMsgCustomOrder, addCustomMarketOrderRow, deleteCustomMarketOrderRow, handleChangeCustomOrder } = useCustomMarketOrder(
    formData,
    setFormData
  );
  const {errMsgBuchOrder,
    addBunchOrderRow,
    deleteBunchOrderRow,
    handleChangeBunchOrder,
    isBunchWeightDisabled}=useBunchOrder(formData,setFormData)

  // Function to handle changes in input fields
  const handleChange = (e: any) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  // Fuction to fetch purity values
  const getPurityValues = async () => {
    const url = `${CONSTANTS.API_BASE_URL}/api/resource/Purity`;
    const fetchValues = await callGetAPI(url, TokenFromStore.token);
    return fetchValues;
  };
  const fetchPurityValues = async () => {
    const values = await getPurityValues();
    setPurityValues(values?.data?.data);
  };
  // Function to fetch design name values
  const getRefCodeList = async () => {
    const params = `Customer Item Reference Code?fields=["name","item_code","customer_name","reference_code"]&customer_name=&limit=none`;
    const url = `${CONSTANTS.API_BASE_URL}/api/resource/${params}`;
    const fetchValues = await callGetAPI(url, TokenFromStore.token);
    return fetchValues;
  };
  const fetchRefCodeValues = async () => {
    const values = await getRefCodeList();
    setRefCodesList(values?.data?.data);
  };
  useEffect(() => {
    fetchPurityValues();
    fetchRefCodeValues();
  }, []);

  return {
    formData,
    handleChange,
    purityValues,
    addMarketOrderRow,
    deleteMarketOrderRow,
    errMsgMarketOrder,
    handleChangeMarketOrder,
    refCodesList,
    errMsgCustomOrder,
    addCustomMarketOrderRow,
    deleteCustomMarketOrderRow,
    handleChangeCustomOrder,
    errMsgBuchOrder,
    addBunchOrderRow,
    deleteBunchOrderRow,
    handleChangeBunchOrder,
    isBunchWeightDisabled,
  };
};

export default useBulkOrder;
