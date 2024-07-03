import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetContactUs, contact_us_from_store } from '../../../store/slices/general_slices/contactus-slice';

const useContactUs = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const ContactUsStoreData: any = useSelector(contact_us_from_store);

  //   const TokenFromStore: any = useSelector(get_access_token);

  const [contactus, setContactus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<string>('pending');

  useEffect(() => {
    dispatch(GetContactUs() as any);
  }, [dispatch]);
  useEffect(() => {
    if (ContactUsStoreData?.data) {
      setContactus(ContactUsStoreData?.data);
      setIsLoading(ContactUsStoreData?.isLoading);
    } else {
      setContactus([]);
    }
  }, [ContactUsStoreData]);
  // console.log('contact us store', ContactUsStoreData.data);

  useEffect(() => {
    setContactus(null);
  }, [router]);
  return {
    contactus,
    isLoading,
  };
};

export default useContactUs;
