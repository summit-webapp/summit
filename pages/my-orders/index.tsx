import { CONSTANTS } from '../../services/config/app-config';
import getPageMetaData from '../../utils/fetch-page-meta-deta';
import OrderMaster from '../../components/MyOrder/OrderMaster';

const MyOrder = () => {
  return (
    <>
      <OrderMaster />
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

export default MyOrder;
