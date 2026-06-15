import { useEffect } from 'react';
import { ServerDataTypes } from '../../../interfaces/meta-data-interface';
import getPageMetaData from '../../../utils/fetch-page-meta-deta';
import { CONSTANTS } from '../../../services/config/app-config';
import useGoogleAnalyticsOperationsHandler from '../../../hooks/GoogleAnalytics/useGoogleAnalyticsOperationsHandler';
import PageMetaData from '../../../components/PageMetaData';
import ProductListingMaster from '../../../components/ProductCategoriesComponents/ProductListingMaster';
import getComponentsList from '../../../services/api/home-page-apis/get-components-list';
import { ComponentTypes } from '../../../interfaces/components-types';
import getSiteMapList from '../../../services/api/seo-apis/sitemap-api';
import getMultiLingualTextFromAPI from '../../../services/api/general-apis/multilanguage-api';
import TranslationsList from '../../../components/TranslationsList';
import { useDispatch } from 'react-redux';
import { setMultiLingualData } from '../../../store/slices/general_slices/multilang-slice';
import MetaTag from '../../../services/api/general-apis/meta-tag-api';

export const getStaticPaths = async () => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  const apiParams = { type: 'product-category' };
  let getPathsList: string[] = [];
  let getListOfAllPathsFromAPI: any = await getSiteMapList('GET', 'get-site-map', apiParams);
  if (
    getListOfAllPathsFromAPI?.status === 200 &&
    getListOfAllPathsFromAPI?.data?.message?.msg === 'success' &&
    getListOfAllPathsFromAPI?.data?.message?.data?.length > 0
  ) {
    const originalPaths = getListOfAllPathsFromAPI.data.message.data;
    const pathSet = new Set<string>();

    originalPaths.forEach((fullPath: string) => {
      const parts = fullPath.split('/');
      let currPath = '';
      for (let i = 0; i < parts.length; i++) {
        currPath = currPath ? `${currPath}/${parts[i]}` : parts[i];
        pathSet.add(currPath);
      }
    });

    getPathsList = Array.from(pathSet);

  }
  const finalPaths = getPathsList.map((categoryPath: string) => ({ 
    params: {
      category: categoryPath.split('/').pop()?.trim(),
    },
    }))
  .filter(
    (p) =>
    p.params.category &&
    p.params.category !== 'product-category'
  );

  return {
    paths: finalPaths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const { category } = context.params;
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  let componentsList: any;

  const requestParams = { page_type: 'Product Category Page' };
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
      // ...(await serverSideTranslations(locale, ['common', 'footer'])),
      productListPageComponents: fetchComponentsList?.data?.message?.data || {},
      translationsList,
      metaTagsData,
    },
  };
};

const Index = ({ productListPageComponents, translationsList, metaTagsData }: any) => {
  const dispatch = useDispatch();
  const { sendPageViewToGA } = useGoogleAnalyticsOperationsHandler();
  useEffect(() => {
    sendPageViewToGA(window.location.pathname + window.location.search, 'Product Listing Page');
    if (translationsList?.length > 0) {
      dispatch(setMultiLingualData(translationsList));
    }
  }, []);
  return (
    <>
      <TranslationsList>
        {CONSTANTS.ENABLE_META_TAGS && <PageMetaData meta_data={metaTagsData} />}
        <ProductListingMaster componentsList={productListPageComponents} />
      </TranslationsList>
    </>
  );
};

export default Index;
