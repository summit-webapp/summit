import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductSpecifications, product_specification_state } from '../../store/slices/product-detail-page-slices/product-specification-slice';
import { useRouter } from 'next/router';
import { fetchPincodeServiceableArea, validate_pincode_state } from '../../store/slices/product-detail-page-slices/pincode-validate-slice';


const usePincodeValidation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {query} = useRouter()
  console.log('@@product in query', query.product_id)
  const validatePincodeFromStore = useSelector(validate_pincode_state);
  console.log('pincode1 from store in hook ',validatePincodeFromStore)
  const [Loadings, setLoadings] = useState('');
  const [ pincodeRes, setPincodeRes] = useState<any>([]);
  const [pincode , setPincode] = useState<any>()
  console.log('pincode1 ',pincode)
  useEffect(() => {
    dispatch(fetchPincodeServiceableArea({pincode}));
  }, [pincode]);

  useEffect(() => {
    setLoadings(validatePincodeFromStore.isLoading);

    if(validatePincodeFromStore.data) {
      setPincodeRes(validatePincodeFromStore?.data);
    }
  }, [validatePincodeFromStore]);

console.log('pincode res',pincodeRes)
  return {pincodeRes,setPincode,Loadings};
};

export default usePincodeValidation;
