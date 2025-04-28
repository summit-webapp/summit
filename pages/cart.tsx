import { useDispatch } from 'react-redux';
import CartPageMaster from '../components/Cart/ApparelCartPage/CartPageMaster';
import getMultiLingualTextFromAPI from '../services/api/general-apis/multilanguage-api';
import getComponentsList from '../services/api/home-page-apis/get-components-list';
import { CONSTANTS } from '../services/config/app-config';
import getPageMetaData from '../utils/fetch-page-meta-deta';
import useGoogleAnalyticsOperationsHandler from '../hooks/GoogleAnalytics/useGoogleAnalyticsOperationsHandler';
import CartListingMaster from '../components/Cart/CartListingMaster';
// import { useEffect } from 'react';
const Cart = ({ cartPageComponents, translationsList }: any) => {
  // const dispatch = useDispatch();
  // const { sendPageViewToGA } = useGoogleAnalyticsOperationsHandler();
  // useEffect(() => {
  //   sendPageViewToGA(window.location.pathname + window.location.search, 'Product Listing Page');
  //   if (translationsList?.length > 0) {
  //     dispatch(setMultiLingualData(translationsList));
  //   }
  // }, []);
  return (
    <>
      <CartListingMaster componentsList={cartPageComponents} />
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  let componentsList: any;

  const requestParams = { page_type: 'Cart Page' };
  let fetchComponentsList: any = await getComponentsList('GET', 'get-page-components-list-api', requestParams);
  if (fetchComponentsList?.status === 200 && fetchComponentsList?.data?.message?.msg === 'success') {
    componentsList = fetchComponentsList?.data?.message?.data;
  }
  let translationsList: any;
  let getMultilanguageData: any = await getMultiLingualTextFromAPI(SUMMIT_APP_CONFIG);
  if (getMultilanguageData?.length > 0) {
    translationsList = getMultilanguageData;
  } else {
    translationsList = [];
  }

  return {
    props: {
      cartPageComponents: fetchComponentsList?.data?.message?.data || {},
      translationsList,
    },
  };
};

// export async function getServerSideProps(context: any) {
//   const { SUMMIT_APP_CONFIG } = CONSTANTS;
//   const method = 'get_meta_tags';
//   const version = SUMMIT_APP_CONFIG.version;
//   const entity = 'seo';
//   const params = `?version=${version}&method=${method}&entity=${entity}`;
//   const url = `${context.resolvedUrl.split('?')[0]}`;
//   if (CONSTANTS.ENABLE_META_TAGS) {
//     return await getPageMetaData(params, url);
//   } else {
//     return {
//       props: {},
//     };
//   }
// }

export default Cart;
