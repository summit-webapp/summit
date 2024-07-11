import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductMatchingItemOptions, product_matching_items_selector_state } from '../../store/slices/product-detail-page-slices/product-item-options-slice';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { useRouter } from 'next/router';
import { currency_selector_state } from '../../store/slices/general_slices/multi-currency-slice';

const useMatchingItemOptions = () => {
  const [productItemOptions, setProductItemOptions] = useState([]);
  const dispatch = useDispatch();
  const TokenFromStore = useSelector(get_access_token);
  const token = TokenFromStore?.token;
  const { query }: any = useRouter();
  const productId = query.product_id;
  const product_matching_items_data_from_redux = useSelector(product_matching_items_selector_state);
  const [matchingItemLoading, setMatchingItemLoading] = useState<boolean>(false);
  const currency_state_from_redux: any = useSelector(currency_selector_state);

  useEffect(() => {
    dispatch(
      ProductMatchingItemOptions({
        productID: productId,
        currency: query.currency,
        token: token,
      }) as any
    );
  }, [query]);

  useEffect(() => {
    switch (product_matching_items_data_from_redux?.loading) {
      case 'pending':
        setMatchingItemLoading(true);
        setProductItemOptions([]);
        break;
      case 'succeeded':
        if (product_matching_items_data_from_redux?.data?.length > 0) {
          setProductItemOptions(product_matching_items_data_from_redux?.data);
        } else {
          setProductItemOptions([]);
        }
        setMatchingItemLoading(true);
        break;
      case 'failed':
        setMatchingItemLoading(true);
        setProductItemOptions([]);
        break;
    }
  }, [product_matching_items_data_from_redux]);

  return {
    productItemOptions,
    matchingItemLoading,
    currency_state_from_redux,
  };
};

export default useMatchingItemOptions;
