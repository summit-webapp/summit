import { useState } from 'react';

type AddressType = {
  name: string;
  address_1: string;
  address_2: string;
  address_type: string;
  state: string;
  city: string;
  postal_code: string;
  set_as_default: Boolean;
  email?: string;
  contact?: string;
};

const useAddressCreation = () => {
  const [] = useState<AddressType>({
    name: '',
    address_1: '',
    address_2: '',
    address_type: '',
    state: '',
    city: '',
    postal_code: '',
    set_as_default: false,
    email: '',
    contact: '',
  });
  return {};
};

export default useAddressCreation;
