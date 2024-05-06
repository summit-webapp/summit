import React, { useEffect, useState } from 'react'
import { SelectedFilterLangDataFromStore } from '../../../store/slices/general_slices/selected-multilanguage-slice';
import { useSelector } from 'react-redux';

const useLanguageHook = () => {
    const SelectedLangDataFromStore:any = useSelector( SelectedFilterLangDataFromStore);

    // Language code 
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();

  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
  // Language code End
   
  return {
    selectedMultiLangData
  }
}

export default useLanguageHook
