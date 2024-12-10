import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { multiLanguageDataFromStore, setMultiLingualData } from '../../store/slices/general_slices/multilang-slice';
import { SelectedFilterLangDataFromStore, SelectedLangData } from '../../store/slices/general_slices/selected-multilanguage-slice';

const useInitializeStoreWithMultiLingualData = (multiLingualData: any) => {
  const dispatch = useDispatch();
  const { languageData } = useSelector(multiLanguageDataFromStore);
  const [selectedLang, setSelectedLang] = useState<any>('en');

  useEffect(() => {
    dispatch(setMultiLingualData(multiLingualData));
    // Retrieve the selected language from localStorage on component mount
    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang) {
      setSelectedLang(storedLang);
    } else {
      // If no language is stored in localStorage, set the default language to English
      setSelectedLang('en');
    }
  }, []);

  useEffect(() => {
    const params = {
      multilanguageData: languageData,
      selectedLanguage: selectedLang,
    };
    dispatch(SelectedLangData(params) as any);
  }, [selectedLang, languageData, dispatch]);

  return {};
};

export default useInitializeStoreWithMultiLingualData;
