import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ClearWarrantyDetails,
  WarrantySerailNoDetails,
  warranty_serial_details_from_store,
} from '../../store/slices/warranty-check-slice/get-serial-no-details-slice';
import { useRouter } from 'next/router';
import { ClearWarrantyClaim, WarrantyGetClaim, warranty_get_claim_from_store } from '../../store/slices/warranty-check-slice/get-warranty-claim-slice';
import {
  ClearWarrantyCustomer,
  GetCustomerWarrantyDetails,
  warranty_customer_details_from_store,
} from '../../store/slices/warranty-check-slice/get-customer-warranty-details-slice';
import { ClearWarrantyList, WarrantySerialNoList, warranty_serial_list_from_store } from '../../store/slices/warranty-check-slice/get-serial-no-list-slice';

const useWarrantyCheck = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const warrantySerialDetailStoreData: any = useSelector(warranty_serial_details_from_store);

  const warrantyGetClaimStoreData: any = useSelector(warranty_get_claim_from_store);
  const warrantyCustomerDetailsStoreData: any = useSelector(warranty_customer_details_from_store);
  const warrantySerialListStoreData: any = useSelector(warranty_serial_list_from_store);
  //   const TokenFromStore: any = useSelector(get_access_token);
  const [customerWarrantyDetails, setCustomerWarrantyDetails] = useState<any>(null);
  const [customerWarrantyList, setCustomerWarrantyList] = useState<any>(null);
  const [warrantyClaim, setWarrantyClaim] = useState<any>(null);
  const [serialDetails, setSerialDetails] = useState<any>(null);
  const [getClaim, setGetClaim] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<string>('pending');

  const [searchValue, setSearchValue] = useState('');

  const handleSearchIputValue = (e: any) => {
    setSearchValue(e?.target?.value);
  };

  console.log(searchValue, 'serial');
  const handleSearch = () => {
    dispatch(WarrantySerailNoDetails(searchValue) as any);
    dispatch(WarrantyGetClaim(searchValue) as any);
    dispatch(GetCustomerWarrantyDetails(searchValue) as any);
    // dispatch(WarrantySerialNoList(searchValue) as any)
  };

  useEffect(() => {
    if (warrantySerialDetailStoreData?.data) {
      if (warrantySerialDetailStoreData?.data.length > 0) {
        setSerialDetails(warrantySerialDetailStoreData?.data[0]);
      } else {
        setSerialDetails(null);
      }
      setIsLoading(warrantySerialDetailStoreData?.isLoading);
    } else {
      setSerialDetails(null);
    }
    if (warrantyGetClaimStoreData?.data) {
      if (warrantyGetClaimStoreData?.data.length > 0) {
        setWarrantyClaim(warrantyGetClaimStoreData?.data[0]);
      } else setWarrantyClaim(null);
      setIsLoading(warrantyGetClaimStoreData?.isLoading);
    } else {
      setWarrantyClaim(null);
    }
    if (warrantyCustomerDetailsStoreData?.data?.warranty_details) {
      setCustomerWarrantyDetails(warrantyCustomerDetailsStoreData?.data?.warranty_details);
      setIsLoading(warrantyGetClaimStoreData?.isLoading);
    } else {
      setCustomerWarrantyDetails(null);
    }
    if (warrantySerialListStoreData?.data) {
      setCustomerWarrantyList(warrantySerialListStoreData?.data);
      setIsLoading(warrantyGetClaimStoreData?.isLoading);
    } else {
      setCustomerWarrantyList(null);
    }
  }, [warrantySerialDetailStoreData, warrantyGetClaimStoreData, warrantyCustomerDetailsStoreData, warrantySerialListStoreData]);
  console.log('serial details 1', serialDetails);
  console.log('serial details 2', warrantyClaim);
  console.log('serial details 3', customerWarrantyDetails);

  useEffect(() => {
    setSerialDetails(null);
    setGetClaim(null);
    setCustomerWarrantyList(null);
    setCustomerWarrantyDetails(null);
    ClearWarrantyClaim();
    ClearWarrantyCustomer();
    ClearWarrantyDetails();
    ClearWarrantyList();
  }, [router]);
  return {
    serialDetails,
    warrantyClaim,
    customerWarrantyDetails,
    customerWarrantyList,
    isLoading,
    handleSearch,
    handleSearchIputValue,
    searchValue,
  };
};

export default useWarrantyCheck;
