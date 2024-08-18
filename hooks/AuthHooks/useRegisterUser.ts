import React, { useState } from 'react';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import typeRegistrationProps from '../../interfaces/registration-interface';
import registrationAPI from '../../services/api/auth/registration-api';
import { CONSTANTS } from '../../services/config/app-config';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const useRegisterUser = () => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  const router = useRouter();
  const { isLoading, setIsLoading, errorMessage, setErrMessage } = useHandleStateUpdate();
  const [registrationFormData, setRegistrationFormData] = useState<typeRegistrationProps>({
    salutation: '',
    name: '',
    email: '',
    password: '',
    contact_no: '',
    state: '',
    city: '',
    address_line_1: '',
    address_line_2: '',
    postal_code: '',
    customer_group: '',
    gst_number: '',
  });

  const handleRegistrationFormValueChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitRegistrationForm = async () => {
    let registrationAPIResponse: any;
    // Remove keys with empty values
    const removeEmptyValues = (registrationFormData: typeRegistrationProps) => {
      return Object.fromEntries(Object.entries(registrationFormData).filter(([key, value]) => value !== ''));
    };
    const cleanedData: any = removeEmptyValues(registrationFormData);
    setIsLoading(true);
    try {
      registrationAPIResponse = await registrationAPI(SUMMIT_APP_CONFIG, cleanedData);
      if (registrationAPIResponse?.status === 200 && registrationAPIResponse?.data?.message?.msg === 'success') {
        toast.success('User Registered successfully! Please login');
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      }
    } catch (error) {
      setErrMessage(registrationAPIResponse?.data?.message?.error);
      toast.error(`${registrationAPIResponse?.data?.message?.error}`);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    errorMessage,
    handleRegistrationFormValueChanges,
    submitRegistrationForm,
  };
};

export default useRegisterUser;
