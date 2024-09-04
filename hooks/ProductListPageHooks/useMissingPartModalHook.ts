import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';

const useMissingPartModalHook = () => {
  const dispatch = useDispatch();
  const [descriptionVal, setdescriptionval] = useState<any>('');
  const tokenFromStore: any = useSelector(get_access_token);
  const [messageNew, setmessageNew] = useState<any>('');
  const [showMissingPartsModal, setShowMissingPartsModal] = useState<any>(false);

  const handleMissingPartsModalClose: any = () => {
    setShowMissingPartsModal(false);
  };

  const handleSubmit: any = async (e: any) => {
    e.preventDefault();
    if (descriptionVal !== '') {
      // const missingPartsApiRes = await MissingPartsAPI(
      // tokenFromStore?.token,
      //   descriptionVal,
      //   null
      // );
      // if (
      //   missingPartsApiRes?.status === 200 &&
      //   missingPartsApiRes?.data?.message?.msg === "success"
      // ) {
      //   setdescriptionval("");
      //   showToast("Enquiry Submitted", "success");
      // }
      handleMissingPartsModalClose();
    } else {
      setmessageNew('*This field is required');
    }
  };

  return { handleSubmit, handleMissingPartsModalClose, showMissingPartsModal, setShowMissingPartsModal };
};

export default useMissingPartModalHook;
