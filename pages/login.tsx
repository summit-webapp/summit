import { useRouter } from 'next/router';
import { CONSTANTS } from '../services/config/app-config';
import checkAuthorizedUser from '../utils/auth';
import { ServerDataTypes } from '../interfaces/meta-data-interface';
import getPageMetaData from '../utils/fetch-page-meta-deta';
import PageMetaData from '../components/PageMetaData';
import LoginComponent from '../components/Auth/LoginComponent';

const login = ({ serverDataForPages }: ServerDataTypes) => {
  const router = useRouter();
  function checkIfUserIsAuthorized() {
    const checkUserStatus = checkAuthorizedUser();
    if (checkUserStatus) {
      router.push('/');
    } else {
      return <LoginComponent />;
    }
  }
  return (
    <>
      {CONSTANTS.ENABLE_META_TAGS && <PageMetaData meta_data={serverDataForPages.metaData} />}
      {CONSTANTS?.ALLOW_GUEST_TO_ACCESS_SITE_EVEN_WITHOUT_AUTHENTICATION ? <LoginComponent /> : checkIfUserIsAuthorized()}
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
export default login;
