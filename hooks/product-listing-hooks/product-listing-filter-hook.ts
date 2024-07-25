import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { fetchProductListingPageFilters } from '../../services/api/product-listing-page-api/get-filters-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useProductListingFilterHook = () => {
  const router: any = useRouter();
  const { query } = useRouter();
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const tokenFromStore: any = useSelector(get_access_token);

  const [filtersData, setFiltersData] = useState<any>([]);
  const [selectedFilters, setSelectedFilters] = useState<any>();

  const fetchFiltersDataFunction = async () => {
    setIsLoading(true);

    try {
      const reqParams = {
        query: query,
        token: tokenFromStore?.token,
      };
      const getFiltersData: any = await fetchProductListingPageFilters(reqParams);
      if (getFiltersData?.data?.message?.msg === 'success') {
        setFiltersData(getFiltersData?.data?.message?.data);
        setIsLoading(false);
      } else {
        setFiltersData([]);
        setIsLoading(false);
        setErrMessage(getFiltersData?.data?.message?.error);
      }

      return getFiltersData;
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiltersDataFunction();
    if (router.query.hasOwnProperty('filter')) {
      const encodedFilterString: any = router.query.filter;
      if (encodedFilterString !== undefined) {
        const decodedFilterString = decodeURIComponent(encodedFilterString);
        const decodedFilters = JSON.parse(decodedFilterString);
        setSelectedFilters(decodedFilters);
      }
    } else {
      setSelectedFilters([]);
    }
  }, [query]);

  const handleFilterCheckFun = async (event: any) => {
    let duplicateFilters: any;
    const section = event.target.name;
    const filterValue = event.target.value;
    const isChecked = event.target.checked;

    await setSelectedFilters((prevFilters: any) => {
      let updatedFilters = [...prevFilters];

      const existingSectionIndex = prevFilters.findIndex((filter: any) => filter.name === section);

      if (existingSectionIndex !== -1) {
        if (isChecked) {
          updatedFilters[existingSectionIndex].value = [...updatedFilters[existingSectionIndex].value, filterValue];
        } else {
          updatedFilters[existingSectionIndex].value = updatedFilters[existingSectionIndex].value.filter((val: any) => val !== filterValue);
          if (updatedFilters[existingSectionIndex].value.length === 0) {
            updatedFilters = updatedFilters.filter((filter) => filter.name !== section);
          }
        }
      } else if (isChecked) {
        updatedFilters.push({ name: section, value: [filterValue] });
      }
      duplicateFilters = [...updatedFilters];
      return updatedFilters;
    });
    const filterString = duplicateFilters.length > 0 ? `&filter=${encodeURIComponent(JSON.stringify(duplicateFilters))}` : '';
    let url = router.asPath;
    const existingFilterIndex = url.indexOf('&filter=');
    if (existingFilterIndex !== -1) {
      const ampIndex = url.indexOf('&', existingFilterIndex + 1);
      if (ampIndex !== -1) {
        url = url.slice(0, existingFilterIndex) + url.slice(ampIndex);
      } else {
        url = url.slice(0, existingFilterIndex);
      }
    }
    
    if (filterString) {
      url = `${url.split('?')[0]}?&page=1${filterString}`;
    } else {
      url = `${url.split('?')[0]}?page=1`;
    }

    await router.push(url);
  };

  return {
    filtersData,
    isLoading,
    errorMessage,
    handleFilterCheckFun,
    selectedFilters,
  };
};

export default useProductListingFilterHook;
