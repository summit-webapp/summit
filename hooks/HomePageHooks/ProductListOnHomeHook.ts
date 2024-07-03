import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProductListOnHome, product_list_on_home_state } from '../../store/slices/home_page_slice/get-product-list-on-home-slice';

const useProductListOnHome = () => {
  const dispatch = useDispatch();
  const [productListDataOnHome, setProductListDataOnHome] = useState<any>(null);
  const productListOnHomeFromStore = useSelector(product_list_on_home_state);
  console.log('vortex from store', productListDataOnHome);

  useEffect(() => {
    dispatch(fetchProductListOnHome() as any);
  }, [dispatch]);

  useEffect(() => {
    if (productListOnHomeFromStore.data) {
      setProductListDataOnHome(productListOnHomeFromStore?.data);
    }
  }, [productListOnHomeFromStore]);

  return { productListDataOnHome, loading: productListOnHomeFromStore?.loading };
};

export default useProductListOnHome;
