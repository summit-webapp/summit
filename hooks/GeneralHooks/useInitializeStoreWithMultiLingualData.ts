import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { multiLanguageDataFromStore, setMultiLingualData } from '../../store/slices/general_slices/multilang-slice';
import useMultilangHook from '../LanguageHook/Multilanguages-hook';

const useInitializeStoreWithMultiLingualData = (multiLingualData: any) => {
  const dispatch = useDispatch();
  const MultiLanguageFromStore = useSelector(multiLanguageDataFromStore);
  if (MultiLanguageFromStore?.languageData?.length === 0) {
    dispatch(setMultiLingualData(multiLingualData));
    useMultilangHook();
  }
  return {};
};

export default useInitializeStoreWithMultiLingualData;
