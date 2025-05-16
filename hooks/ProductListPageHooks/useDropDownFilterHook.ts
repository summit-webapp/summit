import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { CONSTANTS } from '../../services/config/app-config';
import fetchProductListingPageFilters from '../../services/api/product-listing-page-apis/get-filters-api';
import fetchProductListingPageDropDownFilters from '../../services/api/product-listing-page-apis/get-dropdown-filters-api';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import fetchProductListingPageALLFilters from '../../services/api/product-listing-page-apis/get-all-filters-api';

const useDropDownFilterHook = () => {
  const router = useRouter();
  const { query } = router;
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  const tokenFromStore = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage } = useHandleStateUpdate();

  const [isLoadingDropDown, setIsLoadingDropDown] = useState(false);
  const [errorMessageDropDown, setErrMessageDropDown] = useState('');
  const [filtersData, setFiltersData] = useState<any>({});
  const [checkBoxfiltersData, setCheckBoxfiltersData] = useState<any>([]);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);


  // Fetch dropdown filters
  const fetchDropDownFiltersDataFunction = async (paramObject?: any) => {
    setIsLoadingDropDown(true);
    try {
      const response = await fetchProductListingPageDropDownFilters(
        SUMMIT_APP_CONFIG,
        paramObject,
        tokenFromStore?.token
      );

      if (response?.status === 200) {
        setFiltersData(response?.data?.message?.data || {});
      } else {
        setFiltersData({});
        setErrMessageDropDown(response?.error || 'Failed to fetch dropdown filters');
      }
    } catch (error: any) {
      setFiltersData({});
      setErrMessageDropDown(error?.message || 'API error');
    } finally {
      setIsLoadingDropDown(false);
    }
  };

  // Fetch checkbox filters
  const fetchFiltersDataFunction = async () => {
    setIsLoading(true);
    const reqParams = {
      query: query,
    };
    try {
      let getFiltersData: any;
      if (!query?.category) {
        getFiltersData = await fetchProductListingPageALLFilters(SUMMIT_APP_CONFIG, tokenFromStore?.token);
      } else {
        getFiltersData = await fetchProductListingPageFilters(SUMMIT_APP_CONFIG, reqParams, tokenFromStore?.token);
      }
      if (getFiltersData?.data?.message?.msg === 'success') {
        setCheckBoxfiltersData(getFiltersData?.data?.message?.data);
        setIsLoading(false);
      } else {
        setCheckBoxfiltersData([]);
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

  // Initial fetch on mount
  useEffect(() => {
    // fetchFiltersDataFunction();
    fetchDropDownFiltersDataFunction();
  }, []);

  // Handle query changes and update filters
  useEffect(() => {
    fetchFiltersDataFunction(); // Initial fetch (assuming this should be fetchDropDownFiltersDataFunction)

    if (query.vehicle_filters) {
      try {
        const filterParam = Array.isArray(query.vehicle_filters)
        ? query.vehicle_filters[0] // Use the first value if it's an array
        : query.vehicle_filters;
        // const decodedFilterString = decodeURIComponent(query?.vehicle_filters);
        const decodedFilterString = decodeURIComponent(filterParam);
        const decodedFilters = JSON.parse(decodedFilterString);
        setSelectedFilters(decodedFilters);

        // Check for "Vehicle Company" and "Vehicle" in decodedFilters
        const vehicleCompanyFilter = decodedFilters.find((filter: any) => filter.name === "Vehicle Company");
        const vehicleFilter = decodedFilters.find((filter: any) => filter.name === "Vehicle");

        // Construct paramObject with available values, default to empty array if not present
        const paramObject = {
          vehicle_company: vehicleCompanyFilter ? vehicleCompanyFilter.value : [],
          vehicle_name: vehicleFilter ? vehicleFilter.value : []
        };

        // Call fetchDropDownFiltersDataFunction with paramObject if at least one filter exists
        if (vehicleCompanyFilter || vehicleFilter) {
          fetchDropDownFiltersDataFunction(paramObject);
        } else {
          // If neither filter is present, fetch without additional params
          fetchDropDownFiltersDataFunction();
        }
      } catch (error) {
        console.error('Error parsing vehicle_filters from URL:', error);
        fetchDropDownFiltersDataFunction(); // Fetch default dropdown on error
      }
    } else {
      // If no vehicle_filters in query, reset filters and fetch default dropdown
      setSelectedFilters([]);
      fetchDropDownFiltersDataFunction();
    }
  }, [query]);

  // Update URL with filters
  const updateUrlWithFilters = async (filters: any[]) => {
    const baseUrl = router.asPath.split('?')[0];
    const filterString = filters.length > 0 ? `&vehicle_filters=${encodeURIComponent(JSON.stringify(filters))}` : '';
    const newUrl = `${baseUrl}?page=1${filterString}`;
    await router.push(newUrl);
  };

  // Handle dropdown filter selection
  const handleFilterSelectDropDown = (option: any, meta: any) => {
    const section = meta?.name || option[0]?.section || '';
    const selectedValue = option[0]?.value;

    setSelectedFilters((prevFilters) => {
      const updatedFilters = [...prevFilters];
      const existingSectionIndex = updatedFilters.findIndex((filter) => filter.name === section);

      if (!selectedValue) {
        // Clear filter for the section
        const newFilters = updatedFilters.filter((filter) => filter.name !== section);
        if (section === 'Vehicle Company') {
          updateUrlWithFilters(newFilters.filter((filter) => filter.name === 'Vehicle Company'));
          return newFilters.filter((filter) => filter.name === 'Vehicle Company');
        }
        updateUrlWithFilters(newFilters);
        return newFilters;
      }

      if (existingSectionIndex !== -1) {
        const values = updatedFilters[existingSectionIndex].value;
        const isSelected = values.includes(selectedValue);

        if (isSelected) {
          updatedFilters[existingSectionIndex].value = values.filter((v: any) => v !== selectedValue);
          if (updatedFilters[existingSectionIndex].value.length === 0) {
            updatedFilters.splice(existingSectionIndex, 1);
          }
        } else {
          updatedFilters[existingSectionIndex].value.push(selectedValue);
        }
      } else {
        updatedFilters.push({ name: section, value: [selectedValue] });
      }

      if (section === 'Vehicle Company') {
        const newFilters = updatedFilters.filter((filter) => filter.name === 'Vehicle Company');
        updateUrlWithFilters(newFilters);
        return newFilters;
      }

      updateUrlWithFilters(updatedFilters);
      return updatedFilters;
    });
  };

  // Handle checkbox filter selection
  const handleFilterCheckFun = async (
    event: any,
    isColorFilter?: boolean,
    isActiveColor?: boolean,
    colorValue?: string
  ) => {
    const section = isColorFilter ? 'Color' : event.target.name;
    const filterValue = isColorFilter ? colorValue : event.target.value;
    const isChecked = isColorFilter ? isActiveColor : event.target.checked;

    setSelectedFilters((prevFilters) => {
      const updatedFilters = [...prevFilters];
      const existingSectionIndex = updatedFilters.findIndex((filter) => filter.name === section);

      if (existingSectionIndex !== -1) {
        if (isChecked) {
          if (!updatedFilters[existingSectionIndex].value.includes(filterValue)) {
            updatedFilters[existingSectionIndex].value.push(filterValue);
          }
        } else {
          updatedFilters[existingSectionIndex].value = updatedFilters[existingSectionIndex].value.filter(
            (val: any) => val !== filterValue
          );
          if (updatedFilters[existingSectionIndex].value.length === 0) {
            updatedFilters.splice(existingSectionIndex, 1);
          }
        }
      } else if (isChecked) {
        updatedFilters.push({ name: section, value: [filterValue] });
      }

      updateUrlWithFilters(updatedFilters);
      return updatedFilters;
    });
  };

  // Clear all filters
  const clearFilters = async () => {
    setSelectedFilters([]);
    const baseUrl = router.asPath.split('?')[0];
    await router.push(`${baseUrl}?page=1`, undefined, { shallow: true });
  };

  return {
    checkBoxfiltersData,
    filtersData,
    isLoadingDropDown,
    isLoading,
    errorMessage,
    errorMessageDropDown,
    handleFilterSelectDropDown,
    handleFilterCheckFun,
    selectedFilters,
    clearFilters,
  };
};

export default useDropDownFilterHook;

