import MetaTag from '../../services/api/general-apis/meta-tag-api';
import { CONSTANTS } from '../../services/config/app-config';
import ProductListingMaster from '../../components/ProductListingComponents/ProductListingMaster';
import PageMetaData from '../../components/PageMetaData/PageMetaData';

const Index = ({ metaData }: any) => {
  return (
    <>
      {CONSTANTS.ENABLE_META_TAGS && <PageMetaData meta_data={metaData} />}
      <>
        <ProductListingMaster />
      </>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const method = 'get_meta_tags';
  const version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const entity = 'seo';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const url = `${context.resolvedUrl.split('?')[0]}`;

  if (CONSTANTS.ENABLE_META_TAGS) {
    let meta_data: any = await MetaTag(`${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_API_SDK}${params}&page_name=${url}`);
    if (meta_data !== null && Object.keys(meta_data).length > 0) {
      const metaData = meta_data?.data?.message?.data;
      return { props: { metaData } };
    } else {
      return { props: {} };
    }
  } else {
    return { props: {} };
  }
}
export default Index;
