import { useSelector } from 'react-redux';
// import { useState, useEffect } from "react";
import { language_json_data_state } from '../../store/slices/language-slice/language-json-slice';

// const withMultiLingualHOC = (WrappedComponent) => {
//   function Component(props) {
//     const languageData = useSelector(language_json_data_state);
//     const [languageDataState, setLanguageDataState] = useState({});

// useEffect(()=>
// {
//   setLanguageDataState({...languageData});
// },[languageData])
//     //render OriginalComponent and pass on its props.
//     return <WrappedComponent languageData={languageDataState}/>;
//   }
//   return Component;
// };
// export default withMultiLingualHOC;

const useMultiLingual = () => {
  const languageData: any = useSelector(language_json_data_state);
  // const [languageDataState, setLanguageDataState] = useState<any>({});

  // useEffect(()=>
  // {
  //   // setLanguageDataState({...languageData});
  // },[languageData])

  return languageData;
};

export default useMultiLingual;
