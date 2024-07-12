import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import fetchProductListingFromAPI from '../../services/api/product-listing-page-api/get-product-list-api';
import { currency_selector_state } from '../../store/slices/general_slices/multi-currency-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useProductListing = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const router = useRouter();
  const { query }: any = useRouter();
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const TokenFromStore: any = useSelector(get_access_token);

  const [toggleProductListView, setToggleProductListView] = useState('list-view');
  const [price, setPrice] = useState<string>('low_to_high');
  const [productListingData, setProductListingData] = useState<any>([]);
  const [productListTotalCount, setProductListTotalCount] = useState<number>(0);
  const handlePrice = (e: any) => {
    setPrice(e.target.value);
  };
  const handlePaginationBtn = (pageNo: any) => {
    router.push({
      query: { ...query, page: pageNo.selected + 1 },
    });
  };
  const handleLoadMore = () => {
    const currentPage = Number(query.page) || 1;
    const nextPage = currentPage + 1;
    router.push({
      query: { ...query, page: nextPage },
    });
  };
  useEffect(() => {
    const catalogSlug = router.route.split('/')[1];
    if (catalogSlug === 'catalog') {
      setToggleProductListView('grid-view');
    } else {
      setToggleProductListView('list-view');
    }
  }, []);
  const handleToggleProductsListingView = (view_value?: any) => {
    if (view_value === 'list-view') {
      setToggleProductListView('list-view');
    } else {
      setToggleProductListView('grid-view');
    }
  };
  const fetchProductListDataAPI = async (params: any) => {
    setIsLoading(true);
    try {
      const productListDataAPI: any = await fetchProductListingFromAPI(params);
      if (productListDataAPI?.data?.message?.msg === 'success' && productListDataAPI?.data?.message?.data?.length) {
        if (productListDataAPI?.length === 0) {
          setProductListingData(productListDataAPI?.data?.message?.data);
        } else {
          if (CONSTANTS.SHOW_MORE_ITEMS === 'load-more') {
            setProductListingData((prevData: any) => [...prevData, ...productListDataAPI?.data?.message?.data]);
          } else if (CONSTANTS.SHOW_MORE_ITEMS === 'paginate') {
            setProductListingData(productListDataAPI?.data?.message?.data);
          }
        }
        setProductListTotalCount(productListDataAPI?.data?.message?.total_count);
        setErrMessage('');
      } else {
        setProductListingData([]);
        setProductListTotalCount(0);
        setErrMessage(productListDataAPI?.data?.message?.error);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    let storeUsefulParamsForFurtherProductListingApi;
    if (router.asPath === '/product-category') {
      router.push({
        query: {
          page: '1',
          currency: currency_state_from_redux?.selected_currency_value,
        },
      });
    }
    storeUsefulParamsForFurtherProductListingApi = {
      router_origin: router.route.split('/')[1],
      url_params: query,
      filterDoctype: 'Category',
      filterDocname: query?.category,
      token: TokenFromStore?.token,
      listing_route: router.route,
      price_range: price,
    };
    fetchProductListDataAPI(storeUsefulParamsForFurtherProductListingApi);
    
  }, [price, router.asPath]);
  return {
    productListingData,
    productListTotalCount,
    toggleProductListView,
    handleToggleProductsListingView,
    handleLoadMore,
    handlePaginationBtn,
    currency_state_from_redux,
    query,
    price,
    handlePrice,
    isLoading,
    errorMessage,
  };
};
export default useProductListing;
