import { useDispatch, useSelector } from 'react-redux';
import { componentsListFromReduxStore, createComponentsList } from '../../store/slices/general_slices/components-slice';
import { ComponentsTypes } from '../../interfaces/meta-data-interface';
import { useEffect } from 'react';

const useInitializeStoreWithComponentsList = (componentsListData: ComponentsTypes[]) => {
  const dispatch = useDispatch();
  const { componentsList }: any = useSelector(componentsListFromReduxStore);

  useEffect(() => {
    if (componentsList?.length !== 0) {
      dispatch(createComponentsList(componentsListData));
    }
  }, []);

  return {};
};

export default useInitializeStoreWithComponentsList;
