import { useEffect, useState } from 'react';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import fetchUserAddressAPI from '../../services/api/checkout/get-user-addresses-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { useSelector } from 'react-redux';
import fetchStateListAPI from '../../services/api/general-apis/get-state-list-api';
import fetchCitiesListAPI from '../../services/api/general-apis/get-cities-list-api';
import { PostAddToCartAPI } from '../../services/api/cart-apis/add-to-cart-api';
import { PostAddressAPI } from '../../services/api/checkout/post-user-address-api';
import { toast } from 'react-toastify';

const useGetUserAddresses = () => {
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const tokenFromStore: any = useSelector(get_access_token);
  // Separate state for Shipping and Billing
  const [shippingAddressLoading, setShippingAddessLoading] = useState(false);
  const [billingAddressLoading, setBillingAddressLoading] = useState(false);
  const [shippingAddressError, setShippingAddressError] = useState<string | null>(null);
  const [billingAddressError, setBillingAddressError] = useState<string | null>(null);
  const [cityList, setCityList] = useState<any>([]);
  const mandatoryField =[  "name","address_1","address_2","country","state","city","postal_code",]
  const [createBillingAdd, setCreateBillingAdd] = useState({
    name: '',
    address_1: '',
    address_2: '',
    country: '',
    state: '',
    city: '',
    postal_code: '',
    email: '',
    contact: '',
    set_as_default: false,
    address_type: '',
  });
  const [createShippingAdd, setCreateShippingAdd] = useState({
    name: '',
    address_1: '',
    address_2: '',
    country: '',
    state: '',
    city: '',
    postal_code: '',
    email: '',
    contact: '',
    set_as_default: false,
    address_type: '',
  });
  const [shippingAddress, setShippingAddress] = useState<any>([]);
  const [emptyAddressFields, setEmptyAddressFields] = useState<any>([]);
  const [billingAddress, setBillingAddress] = useState<any>([]);
  const [editShippingAddress, setEditShippingAddress] = useState({});
  const [editBillingAddress, setEditBillingAddress] = useState({});
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
  const fetchList = async (val: any) => {
    const getCityList = await fetchCitiesListAPI(SUMMIT_APP_CONFIG, val, tokenFromStore.token);
    if (getCityList?.status === 200 && getCityList?.data?.message?.msg === 'success') {
      setCityList([...getCityList?.data?.message?.data]);
    } else {
      setCityList([]);
    }
  };
  const handleEditShippingAddressChange = (e: any) => {
    const { name, value,checked } = e.target;
    console.log(name, 'name');
    setEditShippingAddress({ ...editShippingAddress, [name]: value });
    if (name === 'state') {
      fetchList(value);
    }
    if (name === 'set_as_default') {
      setEditShippingAddress({ ...editShippingAddress, [name]: checked });
    }
  };
  const handleEditBillingAddressChange = (e: any) => {
    const { name, value,checked } = e.target;
    setEditBillingAddress({ ...editBillingAddress, [name]: value });
    if (name === 'state') {
      fetchList(value);
    }
    if (name === 'set_as_default') {
      setEditBillingAddress({ ...editBillingAddress, [name]: checked });
    }
  };
  const handleCreateAddressChange = (e: any, type: any) => {
    const { name, value, checked } = e.target;
    if (type === 'Shipping') {
      console.log(e, 'jjj');
      setCreateShippingAdd({ ...createShippingAdd, [name]: value });
      if (name === 'set_as_default') {
        setCreateShippingAdd({ ...createShippingAdd, [name]: checked });
      }
      if (name === 'state') {
        fetchList(value);
      }
    } else {
      setCreateBillingAdd({ ...createBillingAdd, [name]: value });
      if (name === 'set_as_default') {
        setCreateBillingAdd({ ...createBillingAdd, [name]: checked });
      }
      if (name === 'state') {
        fetchList(value);
      }
    }
  };
  const checkEmptyFields = (fields:any, data:any) => {
    const pushFieldArray:any =[]
    const emptyFields = fields.forEach((field:any) => {
      if(data.hasOwnProperty(field) && !data[field]) {
       pushFieldArray.push(field)
      }
      });
     return setEmptyAddressFields(pushFieldArray)

  };
  const handlePostAddress = async (type: any, createAdd?: any,setShow?:any) => {
    console.log(createAdd, 'createShippingAdd');
    let data: any;
    if (type === 'Shipping') {
      data = createAdd === 'Create' ? createShippingAdd : editShippingAddress;
    } else {
      data = createAdd === 'Create' ? createBillingAdd : editBillingAddress;
    }
  
   checkEmptyFields(mandatoryField, data)
   console.log(data,"data")
   if(emptyAddressFields.length>0){

   }
   else {
    const postAddress = await PostAddressAPI(SUMMIT_APP_CONFIG, data, tokenFromStore.token);
    if (postAddress?.status === 200 && postAddress?.data?.message?.msg === 'success') {
      type === 'Shipping' ? fetchUserShippingAddress() : fetchUserBillingAddress();
      toast.success('Address Updated Sucessfully');
    } else {
      toast.error('Error in Updating Address');
    }
   }

  };

  return {
    shippingAddressLoading,
    billingAddressLoading,
    shippingAddressError,
    billingAddressError,
    fetchUserShippingAddress,
    fetchUserBillingAddress,
    shippingAddress,
    billingAddress,
    handleEditShippingAddressChange,
    handleEditBillingAddressChange,
    setEditShippingAddress,
    editShippingAddress,
    editBillingAddress,
    cityList,
    setEditBillingAddress,
    handlePostAddress,
    handleCreateAddressChange,
    emptyAddressFields,
    setEmptyAddressFields
  };
};

export default useGetUserAddresses;
