import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductSpecifications, product_specification_state } from '../../store/slices/product-detail-page-slices/product-specification-slice';
import { useRouter } from 'next/router';

const useProductSpecification = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = useRouter();
  console.log('@@product in query', query.product_id);
  const productSpecificationFromStore = useSelector(product_specification_state);

  console.log('@@product in hook', productSpecificationFromStore);
  const [Loading, setLoading] = useState('');
  const [productSpecificationData, setProductSpecificationData] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchProductSpecifications({ item_code: query.product_id }));
  }, []);

  useEffect(() => {
    setLoading(productSpecificationFromStore.isLoading);
    if (productSpecificationFromStore.data) {
      setProductSpecificationData(productSpecificationFromStore?.data);
    }
  }, [productSpecificationFromStore]);

  return { productSpecificationFromStore, productSpecificationData, Loading };
};

export default useProductSpecification;
