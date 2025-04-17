import { useEffect, useState } from 'react';
import fetchProductListingPageFilters from '../../services/api/product-listing-page-apis/get-filters-api';
import { CONSTANTS } from '../../services/config/app-config';

const useFiltersHook = () => {
  const { APP_NAME, SUMMIT_APP_CONFIG }: any = CONSTANTS;

  const [customerCodeList, setCustomerCodeList] = useState([]);
  const [selectedCustomerCode, setSelectedCustomerCode] = useState<any>();
  const [sourceTypeList, setSourceTYpeList]: any[] = useState([
    { label: 'Design Bank', value: 'DB' },
    { label: 'Stock', value: 'stock' },
    { label: 'Vouchers', value: 'vouchers' },
  ]);
  const [statusList, setStatusList] = useState([
    { label: 'All', value: 'All' },
    { label: 'In Stock', value: 'In Stock' },
    { label: 'On Memo', value: 'On Memo' },
  ]);

  const [originList, setOriginList] = useState([
    { label: 'All', value: 'All' },
    { label: 'KC', value: 'KC' },
    { label: 'Outside', value: 'Outside' },
    { label: 'Party Goods', value: 'Party Goods' },
  ]);

  const [typeList, setTypeList] = useState([{ label: '', value: '' }]);
  const [selectedSourceType, setSelectedSourceType] = useState<any>(null);
  const [statusTags, setStatusTags] = useState<string[]>([]);
  const [originTags, setOriginTags] = useState<string[]>([]);
  const [typeTags, setTypeTags] = useState<string[]>([]);
  const [salesCategoryList, setSalesCategoryList] = useState([]);

  const [designCategoryList, setDesignCategoryList] = useState([]);
  const [designTags, setDesignTags] = useState<string[]>([]);
  const [salesTags, setSalesTags] = useState<string[]>([]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  const [filters, setFilters] = useState<any>();
  const [displayQualityTags, setDisplayQualityTags] = useState<string[]>([]);
  const [sortByTags, setSortByTags] = useState<string[]>([]);
  const [styleCodeTags, setStyleCodeTags] = useState<string[]>([]);
  const [bagNumberTags, setBagNumberTags] = useState<string[]>([]);
  const [designColourTags, setDesignColourTags] = useState<string[]>([]);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [diamondCtsRange, setDiamondCtsRange] = useState<[number, number]>([0, 0]);
  const [grossWtRange, setGrossWtRange] = useState<[number, number]>([0, 0]);
  const [selectedColorStone, setSelectedColorStone] = useState();

  const [designColorList, setDesignColorList] = useState([]);

  const displayQualityList = [{ label: '', value: '' }];

  const sortByList = [{ label: '', value: '' }];

  const styleCodeList = [{ label: '', value: '' }];

  const bagNoList = [{ label: '', value: '' }];

  const collectionList = [{ label: '', value: '' }];

  const inspirationList = [{ label: '', value: '' }];

  const verticalList = [{ label: '', value: '' }];

  const openSidebar = (filterType: any) => {
    setSelectedFilter(filterType);
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const handleAcceptIndivisualFilter = (newFilters: Record<string, any>) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const sectionToSetterMap: any = {
    customers: setCustomerCodeList,
    design_category: setDesignCategoryList,
    sales_category: setSalesCategoryList,
    design_color: setDesignColorList,
  };

  const fetchFiltersData = async () => {
    const reqParams = {
      query: '',
    };
    const getFiltersData: any = await fetchProductListingPageFilters(SUMMIT_APP_CONFIG, reqParams, undefined, APP_NAME);
    console.log('getFiltersData', getFiltersData);
    if (getFiltersData?.data?.msg === 'success') {
      const filtersData = getFiltersData?.data?.data?.filters;

      filtersData?.forEach((item: any) => {
        // Lookup the setter based on 'section' and call it
        const setter = sectionToSetterMap[item.section];
        if (item.section === 'customers') {
          const mappedValues = item.values.map((val: any) => ({
            label: val.CmCd,
            value: val.CmCd,
          }));
          setter(mappedValues);
        } else if (item.section === 'design_category' || item.section === 'design_color') {
          if (Array.isArray(item.values)) {
            const mappedValues = item?.values?.map((val: any) => ({
              label: val.PMCd,
              value: val.PMCd,
            }));
            setter(mappedValues);
          }
        } else if (item.section === 'sales_category') {
          if (Array.isArray(item.values)) {
            const mappedValues = item?.values?.map((val: any) => ({
              label: val.PSCd,
              value: val.PSCd,
            }));
            setter(mappedValues);
          }
        }
      });
    }
  };

  useEffect(() => {
    fetchFiltersData();
  }, []);

  return {
    collectionList,
    inspirationList,
    verticalList,
    isSidebarVisible,
    selectedFilter,
    filters,
    openSidebar,
    closeSidebar,
    handleAcceptIndivisualFilter,
    customerCodeList,
    selectedCustomerCode,
    setSelectedCustomerCode,
    sourceTypeList,
    selectedSourceType,
    setSelectedSourceType,
    statusTags,
    setStatusTags,
    salesCategoryList,
    designCategoryList,
    designTags,
    salesTags,
    setDesignTags,
    setSalesTags,
    displayQualityTags,
    sortByList,
    displayQualityList,
    sortByTags,
    styleCodeList,
    styleCodeTags,
    bagNoList,
    bagNumberTags,
    designColorList,
    designColourTags,
    priceRange,
    diamondCtsRange,
    grossWtRange,
    setDesignColourTags,
    setBagNumberTags,
    setStyleCodeTags,
    setSortByTags,
    setDisplayQualityTags,
    setDesignColorList,
    setGrossWtRange,
    setDiamondCtsRange,
    setPriceRange,
    originTags,
    typeTags,
    setOriginTags,
    setTypeTags,
    statusList,
    originList,
    typeList,
    selectedColorStone,
    setSelectedColorStone,
  };
};

export default useFiltersHook;
