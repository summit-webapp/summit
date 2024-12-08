import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { multiLanguageDataFromStore } from '../../store/slices/general_slices/multilang-slice';
import { SelectedLangData } from '../../store/slices/general_slices/selected-multilanguage-slice';

const useMultilangHook = () => {
  const dispatch = useDispatch();
  const MultiLanguageFromStore = useSelector(multiLanguageDataFromStore);
  const [multiLanguagesData, SetMultiLanguagesData] = useState<any>([]);
  const [selectedLang, setSelectedLang] = useState<any>('en');

  const handleLanguageChange = (lang: any) => {
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
    setSelectedLang(lang);

    localStorage.setItem('selectedLanguage', lang);
  };

  useEffect(() => {
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
    if (Object.keys(MultiLanguageFromStore)?.length > 0) {
      SetMultiLanguagesData(MultiLanguageFromStore?.languageData);
    }
  }, [MultiLanguageFromStore]);

  useEffect(() => {
    const params = {
      multilanguageData: MultiLanguageFromStore?.languageData,
      selectedLanguage: selectedLang,
    };
    dispatch(SelectedLangData(params) as any);
  }, [MultiLanguageFromStore, selectedLang]);
  return {
    setSelectedLang,
    selectedLang,
    handleLanguageChange,
    multiLanguagesData,
  };
};

export default useMultilangHook;
