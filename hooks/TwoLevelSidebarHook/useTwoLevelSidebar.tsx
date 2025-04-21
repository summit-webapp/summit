import { useEffect, useState } from 'react';
import fetchProductListingPageFilters from '../../services/api/get-emr-filter/get-emr-filters-api';
import { CONSTANTS } from '../../services/config/app-config';

const useFiltersHook = (getProductsData: any) => {
  const { APP_NAME, SUMMIT_APP_CONFIG }: any = CONSTANTS;

  const [workScopeList, setWorkScopeList] = useState([
    { label: 'Database', value: 'Database' },
    { label: 'Current Session', value: 'Current Session' },
    { label: 'Voucher', value: 'Voucher' },
  ]);

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

  const displayQualityList = [
    { label: 'High', value: 'High' },
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
  ];
  const sortByList = [
    { label: 'Price - Ascending', value: 'priceAsc' },
    { label: 'Price - Descending', value: 'priceDesc' },
    { label: 'Diamond Cts - Ascending', value: 'diamondAsc' },
    { label: 'Diamond Cts - Descending', value: 'diamondDesc' },
    { label: 'Gross Wt - Ascending', value: 'grossAsc' },
    { label: 'Gross Wt - Descending', value: 'grossDesc' },
  ];

  const [selectedScope, setSelectedScope] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  const styleCodeList = [{ label: '', value: '' }];

  const bagNoList = [{ label: '', value: '' }];

  const [targetTags, setTargetTags] = useState<any>();
  const [collectionTags, setCollectionTags] = useState<any>();
  const [inspirationTags, setInspirationTags] = useState<any>();
  const [verticalTags, setVerticalTags] = useState<any>();

  const [targetShowList, setTargetShowList] = useState<{ label: string; value: string }[]>([{ label: '', value: '' }]);

  const [collectionList, setCollectionList] = useState<{ label: string; value: string }[]>([{ label: '', value: '' }]);

  const [inspirationList, setInspirationList] = useState<{ label: string; value: string }[]>([{ label: '', value: '' }]);

  const [verticalList, setVerticalList] = useState<{ label: string; value: string }[]>([{ label: '', value: '' }]);

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
  function mapFilterData(input: any) {
    const result: any = {};

    if (input?.designCategory?.length) {
      result.DmCtg = input?.designCategory.map((item: any) => item.value);
    }

    if (input?.salesCategory?.length) {
      result.DmSalCtg = input?.salesCategory.map((item: any) => item.value);
    }

    if (input?.priceRange?.length === 2) {
      result.FromSalPrc = input?.priceRange[0];
      result.ToSalPrc = input?.priceRange[1];
    }

    if (input?.designColor?.length) {
      result.DmCol = input?.designColor.map((item: any) => item.value);
    }

    if (input?.grossWtRange?.length === 2) {
      result.FromGWt = input?.grossWtRange[0];
      result.ToGWt = input?.grossWtRange[1];
    }

    if (input?.diamond?.length === 2) {
      result.FromDiaWt = input?.diamond[0];
      result.ToDiaWt = input?.diamond[1];
    }

    if (input?.colorStone?.value) {
      result.CsAvl = input?.colorStone.value;
    }
    if (input?.sortByTags?.value) {
      result.sort_by = input?.sortByTags.value;
    }
    if (input?.customer?.value) {
      result.customer = input?.customer.value;
    }

    // Always include these empty by default (as per earlier requirement)
    result.FromCsWt = 0;
    result.ToCsWt = 0;
    result.DmCd = [];
    result.DpCd = [];

    const DsgAna = [];
    if (input.collectionTags?.value) DsgAna.push([1, input.collectionTags.value]);
    if (input.inspiration?.value) DsgAna.push([2, input.inspiration.value]);
    if (input.vertical?.value) DsgAna.push([3, input.vertical.value]);
    if (input.targetTags?.value) DsgAna.push([7, input.targetTags.value]);

    if (DsgAna.length) {
      result.DsgAna = DsgAna;
    }

    return result;
  }

  const handleApplyFilters = () => {
    console.log('filters data', filters);
    if (Object.keys(filters).length === 0) {
      alert('Please select at least one filter option');
      return;
    } else {
      setShowFilters(true);
      const mappedData = mapFilterData(filters);
      getProductsData(mappedData);
      closeSidebar();
    }
  };
  const sectionToSetterMap: any = {
    customers: setCustomerCodeList,
    design_category: setDesignCategoryList,
    sales_category: setSalesCategoryList,
    design_color: setDesignColorList,
  };

  // 1. Map number keys to your state setters
  const keyToSetterMap: any = {
    1: setCollectionList,
    2: setInspirationList,
    3: setTargetShowList,
    7: setVerticalList,
  };

  const fetchFiltersData = async () => {
    const reqParams = {
      query: '',
      anaSr: [1, 2, 3, 7],
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
            label: `${val.CmCd} - ${val.CmName}`,
            value: val.CmCd,
          }));
          setter(mappedValues);
        } else if (item.section === 'design_category' || item.section === 'design_color') {
          if (Array.isArray(item.values)) {
            const mappedValues = item?.values?.map((val: any) => ({
              label: `${val.PMCd} - ${val.PDesc}`,
              value: val.PMCd,
            }));
            setter(mappedValues);
          }
        } else if (item.section === 'sales_category') {
          if (Array.isArray(item.values)) {
            const mappedValues = item?.values?.map((val: any) => ({
              label: `${val.PSCd} - ${val.PDesc}`,
              value: val.PSCd,
            }));
            setter(mappedValues);
          }
        } else if (item?.section === 'design_analysis') {
          Object.entries(item.values).forEach(([key, value]: any) => {
            const setter = keyToSetterMap[Number(key)];
            if (setter) {
              const mappedValues = value?.map((val: any) => ({
                label: `${val.pscd} - ${val.pdesc}`,
                value: val.pscd,
              }));
              setter(mappedValues); // assuming the value is already formatted as [{label, value}]
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchFiltersData();
  }, []);

  return {
    workScopeList,
    setWorkScopeList,
    targetShowList,
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
    handleApplyFilters,
    targetTags,
    setTargetTags,
    collectionTags,
    setCollectionTags,
    inspirationTags,
    setInspirationTags,
    verticalTags,
    setVerticalTags,
    selectedScope,
    setSelectedScope,
    showFilters,
  };
};

export default useFiltersHook;
