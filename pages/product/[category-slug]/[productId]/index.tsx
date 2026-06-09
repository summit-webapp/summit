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
import MetaTag from '../../../../services/api/general-apis/meta-tag-api';

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  let componentsList: any;

  const requestParams = { page_type: 'Product Page' };
  let fetchComponentsList: any = await getComponentsList('GET', 'get-page-components-list-api', requestParams);

  if (fetchComponentsList?.status === 200 && fetchComponentsList?.data?.message?.msg === 'success') {
    componentsList = fetchComponentsList?.data?.message?.data;
  }
  let translationsList: any;
  let getMultilanguageData: any = [];
  // await getMultiLingualTextFromAPI(SUMMIT_APP_CONFIG);
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
      productPageComponents: fetchComponentsList?.data?.message?.data || {},
      translationsList,
      metaTagsData,
    },
  };
};

type BuildPropTypes = {
  productPageComponents: WebsiteInterfaceTypes;
  translationsList: any;
  metaTagsData: any;
  setMoveToFromPage: React.Dispatch<React.SetStateAction<'detail' | 'listing'>>
  moveToSelectedProducts?: any[];
  setMoveToSelectedProducts: React.Dispatch<React.SetStateAction<any[]>>
};

const Index = ({ productPageComponents, translationsList, metaTagsData, setMoveToFromPage, moveToSelectedProducts, setMoveToSelectedProducts }: BuildPropTypes) => {
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
        {CONSTANTS.ENABLE_META_TAGS && <PageMetaData meta_data={metaTagsData} />}
        <ProductPageMaster 
          productPageComponents={productPageComponents}
          setMoveToFromPage={setMoveToFromPage} 
          moveToSelectedProducts={moveToSelectedProducts}
          setMoveToSelectedProducts={setMoveToSelectedProducts}
        />
      </TranslationsList>
    </>
  );
};

export default Index;
