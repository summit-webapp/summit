import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { CONSTANTS } from '../../services/config/app-config';
import fetchProductListingPageFilters from '../../services/api/product-listing-page-apis/get-filters-api';
import axios from 'axios';

const useDropDownFilterHook = () => {
  const router: any = useRouter();
  const { query } = useRouter();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const tokenFromStore: any = useSelector(get_access_token);

  const [filtersData, setFiltersData] = useState<any>([]);
  const [selectedFilters, setSelectedFilters] = useState<any>();
  const [lastChangedSection, setLastChangedSection] = useState<string | null>(null);
  const [initialFiltersSet, setInitialFiltersSet] = useState(false);

  const fetchFiltersDataFunction = async (selectedValues?: any) => {
    const vehicleCompany = selectedValues?.[0];
    const url = `https://staging-auto-house-hubli.8848digitalerp.com/api/method/summitapp.sdk.api?version=v2&method=get_vehicle_filters&entity=filter${vehicleCompany ? `&vehicle_company=${vehicleCompany}` : ''}`;

    setIsLoading(true);
    try {
      const response: any = await axios.get(url);
      if (response?.status === 200) {
        setFiltersData(response?.data?.message || {});
        setErrMessage('');
      } else {
        setFiltersData([]);
        setErrMessage(response?.error || 'Something went wrong');
      }

      return response;
    } catch (error: any) {
      console.error("Error fetching filters:", error);
      setFiltersData([]);
      setErrMessage(error?.message || 'API error');
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (initialFiltersSet) return;
    fetchFiltersDataFunction();

    if (router.query.hasOwnProperty('vehicle_filters')) {
      const encodedFilterString: any = router.query.filter;
      if (encodedFilterString !== undefined) {
        const decodedFilterString = decodeURIComponent(encodedFilterString);
        const decodedFilters = JSON.parse(decodedFilterString);
        setSelectedFilters(decodedFilters);
      }
    }

    setInitialFiltersSet(true); // mark initial setup complete
  }, [query]);

  // 2️⃣ Watch for Vehicle Company changes (only after initial load)
  useEffect(() => {
    const changedFilter = selectedFilters?.length > 0 && selectedFilters.find((f: any) => f.name === lastChangedSection);
    if (lastChangedSection === 'Vehicle Company' && changedFilter) {
      fetchFiltersDataFunction(changedFilter.value);
    }
  }, [selectedFilters, lastChangedSection, initialFiltersSet]);


  const handleFilterCheckFun = async (selectedOptions: any, meta: any = null, isColorFilter?: boolean, isActiveColor?: boolean, colorValue?: string) => {
    let duplicateFilters: any[] = [];
    const section = meta?.name || selectedOptions?.[0]?.section || '';

    if (!selectedOptions || !Array.isArray(selectedOptions) || selectedOptions.length === 0) {
      setSelectedFilters((prevFilters: any) => {
        const updatedFilters = prevFilters.filter((filter: any) => filter.name !== section);
        duplicateFilters = [...updatedFilters];
        setLastChangedSection(section); // track which section changed
        return duplicateFilters;
      });

    } else {
      const selectedValues = selectedOptions.map((opt: any) => opt.value);
      setSelectedFilters((prevFilters: any) => {
        const safePrevFilters = Array.isArray(prevFilters) ? prevFilters : [];
        let updatedFilters = [...safePrevFilters];
        const existingSectionIndex = updatedFilters.findIndex((filter: any) => filter.name === section);

        if (existingSectionIndex !== -1) {
          updatedFilters[existingSectionIndex].value = selectedValues;
        } else {
          updatedFilters.push({ name: section, value: selectedValues });
        }

        duplicateFilters = [...updatedFilters]
        setLastChangedSection(section); // track which section changed
        return duplicateFilters;
      });
    }

    const filterString = duplicateFilters?.length > 0 ? `&vehicle_filters=${encodeURIComponent(JSON.stringify(duplicateFilters))}` : '';
    let url = router.asPath;
    const existingFilterIndex = url.indexOf('&vehicle_filters=');
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
  const clearFilters = async () => {
    setSelectedFilters([]);
    const baseUrl = router.asPath.split('?')[0];
    await router.push(`${baseUrl}?page=1&currency=INR`);
  };
  return {
    filtersData,
    isLoading,
    errorMessage,
    handleFilterCheckFun,
    selectedFilters,
    clearFilters,
  };
};

export default useDropDownFilterHook;
