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
export const getStaticPaths = async () => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  const apiParams = { type: 'product-category' };
  let getPathsList: string[] = [];
  let getListOfAllPathsFromAPI: any = await getSiteMapList(apiParams, SUMMIT_APP_CONFIG);
  if (
    getListOfAllPathsFromAPI?.status === 200 &&
    getListOfAllPathsFromAPI?.data?.message?.msg === 'success' &&
    getListOfAllPathsFromAPI?.data?.message?.data?.length > 0
  ) {
    getPathsList = getListOfAllPathsFromAPI?.data?.message?.data?.map((path: string) => {
      const segments = path.split('/');
      const lastSegment = segments[segments.length - 1].replace(/^\//, ''); // Remove leading '/';
      return `${lastSegment}`;
    });
  }
  return {
    paths: getPathsList.map((category: string) => ({
      params: { category }, // Matches the [category] dynamic segment
    })),
    fallback: false, // Adjust based on your fallback strategy
  };
};

export const getStaticProps = async (context: any) => {
  const { category } = context.params;
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  let componentsList: any;
  let fetchComponentsList: any = await getComponentsList(SUMMIT_APP_CONFIG);
  if (
    fetchComponentsList?.status === 200 &&
    fetchComponentsList?.data?.message?.msg === 'success' &&
    fetchComponentsList?.data?.message?.data?.length > 0
  ) {
    componentsList = fetchComponentsList?.data?.message?.data;
  }
  const filteredProductListingPageComponentsFromAllComponentsList: any = componentsList?.filter(
    (component: ComponentTypes) => component?.page_name === 'listing-page'
  );

  return {
    props: {
      productListPageComponents: filteredProductListingPageComponentsFromAllComponentsList || [],
    },
  };
};

const Index = ({ productListPageComponents }: any) => {
  const { sendPageViewToGA } = useGoogleAnalyticsOperationsHandler();
  useEffect(() => {
    sendPageViewToGA(window.location.pathname + window.location.search, 'Product Listing Page');
  }, []);
  return (
    <>
      {/* {CONSTANTS.ENABLE_META_TAGS && <PageMetaData meta_data={serverDataForPages.metaData} />} */}
      <>
        <ProductListingMaster componentsList={productListPageComponents} />
      </>
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
