import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WarrantySerailNoDetails, warranty_serial_details_from_store } from '../../store/slices/warranty-check-slice/get-serial-no-details-slice';
import { useRouter } from 'next/router';

const useWarrantySerialDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const warrantySerialDetailStoreData: any = useSelector(warranty_serial_details_from_store);

  //   const TokenFromStore: any = useSelector(get_access_token);

  const [serialDetails, setSerialDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<string>('pending');

  const [searchValue, setSearchValue] = useState('');

  const handleSearchIputValue = (e: any) => {
    setSearchValue(e?.target?.value);
  };

  console.log(searchValue, 'serial');
  const handleSearch = () => {
    dispatch(WarrantySerailNoDetails(searchValue) as any);
  };

  useEffect(() => {
    if (warrantySerialDetailStoreData?.data) {
      setSerialDetails(warrantySerialDetailStoreData?.data[0]);
      setIsLoading(warrantySerialDetailStoreData?.isLoading);
    } else {
      setSerialDetails([]);
    }
  }, [warrantySerialDetailStoreData]);
  console.log('serial details', warrantySerialDetailStoreData.data);

  useEffect(() => {
    setSerialDetails(null);
  }, [router]);
  return {
    serialDetails,
    isLoading,
    handleSearch,
    handleSearchIputValue,
    searchValue,
  };
};

export default useWarrantySerialDetails;
