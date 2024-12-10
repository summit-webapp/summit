import getPageMetaData from '../../../utils/fetch-page-meta-deta';
import { ServerDataTypes } from '../../../interfaces/meta-data-interface';
import { CONSTANTS } from '../../../services/config/app-config';
import useInitializeStoreWithComponentsList from '../../../hooks/GeneralHooks/useInitializeStoreWithComponentsList';
import useInitializeStoreWithMultiLingualData from '../../../hooks/GeneralHooks/useInitializeStoreWithMultiLingualData';
import PageMetaData from '../../../components/PageMetaData';
import OrderReportMaster from '../../../components/OrderReportComponents/OrderReportMaster';

const Index = ({ serverDataForPages }: ServerDataTypes) => {
  useInitializeStoreWithMultiLingualData(serverDataForPages?.multiLingualListTranslationTextList);
  useInitializeStoreWithComponentsList(serverDataForPages?.componentsList);

  return (
    <>
      {CONSTANTS.ENABLE_META_TAGS && <PageMetaData meta_data={serverDataForPages.metaData} />}
      <>
        <OrderReportMaster />
      </>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  const method = 'get_meta_tags';
  const version = SUMMIT_APP_CONFIG.version;
  const entity = 'seo';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const url = `${context.resolvedUrl.split('?')[0]}`;
  if (CONSTANTS.ENABLE_META_TAGS) {
    return await getPageMetaData(params, url);
  } else {
    return {
      props: {},
    };
  }
}
export default Index;
