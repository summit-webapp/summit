import { useEffect } from 'react';
import { ServerDataTypes } from '../../../../interfaces/meta-data-interface';
import { CONSTANTS } from '../../../../services/config/app-config';
import getPageMetaData from '../../../../utils/fetch-page-meta-deta';
import useGoogleAnalyticsOperationsHandler from '../../../../hooks/GoogleAnalytics/useGoogleAnalyticsOperationsHandler';
import PageMetaData from '../../../../components/PageMetaData';
import ProductPageMaster from '../../../../components/ProductPageComponents/ProductPageMaster';
import getSiteMapList from '../../../../services/api/seo-apis/sitemap-api';
import getComponentsList from '../../../../services/api/home-page-apis/get-components-list';
import getMultiLingualTextFromAPI from '../../../../services/api/general-apis/multilanguage-api';
import { useDispatch } from 'react-redux';
import { setMultiLingualData } from '../../../../store/slices/general_slices/multilang-slice';
import TranslationsList from '../../../../components/TranslationsList';
import { WebsiteInterfaceTypes } from '../../../../interfaces/website-interface-types';

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: any) => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  let componentsList: any;
  let fetchComponentsList: any = await getComponentsList('Product Page', SUMMIT_APP_CONFIG);
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
      productPageComponents: fetchComponentsList?.data?.message?.data || {},
      translationsList,
    },
  };
};

type BuildPropTypes = {
  productPageComponents: WebsiteInterfaceTypes;
  translationsList: any;
};

const Index = ({ productPageComponents, translationsList }: BuildPropTypes) => {
  const dispatch = useDispatch();
  const { sendPageViewToGA } = useGoogleAnalyticsOperationsHandler();
  useEffect(() => {
    sendPageViewToGA(window.location.pathname + window.location.search, 'Product Detail Page');
    if (translationsList?.length > 0) {
      dispatch(setMultiLingualData(translationsList));
    }
  }, []);
  return (
    <>
      <TranslationsList>
        {/* {CONSTANTS.ENABLE_META_TAGS && <PageMetaData meta_data={serverDataForPages.metaData} />} */}
        <ProductPageMaster productPageComponents={productPageComponents} />
      </TranslationsList>
    </>
  );
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
export default Index;
