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
  const [productListingData, setProductListingData] = useState<any>([]);
  const [productListTotalCount, setProductListTotalCount] = useState<number>(0);
  const [searchFilterValue, setSearchFilterValue] = useState<any>();
  const [sortBy, setSortBy] = useState('latest');
  const handleSortBy = (value: any) => {
    setSortBy(value);
    router.push({
      query: { ...query, sort_by: value, page: 1 },
    });
  };
  const handlePaginationBtn = (pageNo: any) => {
    router.push({
      query: { ...query, page: pageNo + 1 },
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
          sort_by: sortBy,
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
      sort_by: sortBy,
    };
    fetchProductListDataAPI(storeUsefulParamsForFurtherProductListingApi);

    setSearchFilterValue(router.query.search_text);
  }, [router.asPath, sortBy]);

  const handleFilterSearchFun: any = (e: any) => {
    setSearchFilterValue(e.target.value);
  };

  const handleFilterSearchBtn: any = () => {
    const currentQuery = router.query;

    currentQuery.search_text = searchFilterValue;
    const newUrl = {
      pathname: router.pathname,
      query: currentQuery,
    };

    router.push(newUrl);
  };

  return {
    productListingData,
    productListTotalCount,
    toggleProductListView,
    handleToggleProductsListingView,
    handleLoadMore,
    handlePaginationBtn,
    currency_state_from_redux,
    query,
    isLoading,
    errorMessage,
    sortBy,
    handleSortBy,
    handleFilterSearchFun,
    handleFilterSearchBtn,
    searchFilterValue,
  };
};
export default useProductListing;
