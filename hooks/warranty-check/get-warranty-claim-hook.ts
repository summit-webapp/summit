import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WarrantyGetClaim, warranty_get_claim_from_store } from '../../store/slices/warranty-check-slice/get-warranty-claim-slice';

const useWarrantyGetClaim = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const warrantyGetClaimStoreData: any = useSelector(warranty_get_claim_from_store);

  //   const TokenFromStore: any = useSelector(get_access_token);

  const [warrantyClaim, setWarrantyClaim] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<string>('pending');

  const [searchValue, setSearchValue] = useState('');

  const handleSearchIputValue = (e: any) => {
    setSearchValue(e?.target?.value);
  };

  console.log(searchValue, 'serial');
  const handleSearch = () => {
    dispatch(WarrantyGetClaim(searchValue) as any);
  };

  useEffect(() => {
    if (warrantyGetClaimStoreData?.data) {
      setWarrantyClaim(warrantyGetClaimStoreData?.data[0]);
      setIsLoading(warrantyGetClaimStoreData?.isLoading);
    } else {
      setWarrantyClaim([]);
    }
  }, [warrantyGetClaimStoreData]);
  console.log('serial details', warrantyGetClaimStoreData.data);

  useEffect(() => {
    setWarrantyClaim(null);
  }, [router]);
  return {
    warrantyClaim,
    isLoading,
    handleSearch,
    handleSearchIputValue,
    searchValue,
  };
};

export default useWarrantyGetClaim;
