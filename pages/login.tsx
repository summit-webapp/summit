import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import checkAuthorizedUser from '../utils/auth';
import { ServerDataTypes } from '../interfaces/meta-data-interface';
import getPageMetaData from '../utils/fetch-page-meta-deta';
import getComponentsList from '../services/api/home-page-apis/get-components-list';
import { CONSTANTS } from '../services/config/app-config';
import PageMetaData from '../components/PageMetaData';
import LoginComponent from '../components/Auth/StandardLogin/LoginComponent';
import FallbackLogin from '../components/Auth/FallbackLogin/FallbackLogin';

const login = ({ serverDataForPages }: ServerDataTypes) => {
  const router = useRouter();
  const [componentsList, setComponentList] = useState('');

  useEffect(() => {
    async function getLoginPageComponent() {
      try {
        const requestParams = { page_type: 'Login Page' };
        let fetchComponentsList: any = await getComponentsList('GET', 'get-page-components-list-api', requestParams);
        if (fetchComponentsList?.status === 200) {
          setComponentList(fetchComponentsList.data.data.associated_component[0].component);
        }
        let translationsList: any;
        let getMultilanguageData: any = [];
        if (getMultilanguageData?.length > 0) {
          translationsList = getMultilanguageData;
        } else {
          translationsList = [];
        }
      } catch (error) {
        console.error('Error fetching login page components list:', error);
      }
    }
    getLoginPageComponent();
  }, []);

  function renderLoginComponent() {
    switch (componentsList) {
      case 'Standard Login Page':
        return <LoginComponent />;
      case 'Fallback Login Page':
        return <FallbackLogin />;
      default:
        return null;
    }
  }

  function checkIfUserIsAuthorized() {
    const checkUserStatus = checkAuthorizedUser();
    if (checkUserStatus) {
      router.push('/');
    } else {
      return renderLoginComponent();
    }
  }
  return (
    <>
      {CONSTANTS.ENABLE_META_TAGS && <PageMetaData meta_data={serverDataForPages.metaData} />}
      {CONSTANTS?.ALLOW_GUEST_TO_ACCESS_SITE_EVEN_WITHOUT_AUTHENTICATION ? renderLoginComponent() : checkIfUserIsAuthorized()}
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
