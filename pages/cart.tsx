import { useDispatch } from 'react-redux';
import CartPageMaster from '../components/Cart/ApparelCartPage/CartPageMaster';
import getMultiLingualTextFromAPI from '../services/api/general-apis/multilanguage-api';
import getComponentsList from '../services/api/home-page-apis/get-components-list';
import { CONSTANTS } from '../services/config/app-config';
import getPageMetaData from '../utils/fetch-page-meta-deta';
import useGoogleAnalyticsOperationsHandler from '../hooks/GoogleAnalytics/useGoogleAnalyticsOperationsHandler';
import CartListingMaster from '../components/Cart/CartListingMaster';
import MetaTag from '../services/api/general-apis/meta-tag-api';
import PageMetaData from '../components/PageMetaData';
// import { useEffect } from 'react';
const Cart = ({ cartPageComponents, translationsList, metaTagsData}: any) => {
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
      {CONSTANTS.ENABLE_META_TAGS && <PageMetaData meta_data={metaTagsData} />}
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
  let getMultilanguageData: any = [];
  // getMultilanguageData =  await getMultiLingualTextFromAPI(SUMMIT_APP_CONFIG);
  if (getMultilanguageData?.length > 0) {
    translationsList = getMultilanguageData;
  } else {
    translationsList = [];
  }
  let metaTagsData: any;
  if (CONSTANTS.ENABLE_META_TAGS) {
    const method = 'get-meta-tags-api';
    const version = SUMMIT_APP_CONFIG.version;
    const entity = 'seo';
    const params = `?version=${version}&method=${method}&entity=${entity}`;
    let metaData: any = await MetaTag('GET', method);
    if (metaData.status === 200 && metaData?.data?.message?.msg === 'success' && metaData?.data?.message?.data !== 'null') {
      metaTagsData = metaData?.data?.message?.data;
    } else {
      metaTagsData = {};
    }
  }
  return {
    props: {
      cartPageComponents: fetchComponentsList?.data?.message?.data || {},
      translationsList,
      metaTagsData,
    },
  };
};

export default Cart;
