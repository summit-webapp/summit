import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { get_access_token } from '../store/slices/auth/token-login-slice';
import { CONSTANTS } from '../services/config/app-config';
import MetaTag from '../services/api/general_apis/meta-tag-api';
import LoginComponent from '../components/Auth/LoginComponent';

const login = () => {
  const TokenFromStore: any = useSelector(get_access_token);
  const router = useRouter();
  function checkIfUserIsAuthorized() {
    if (TokenFromStore?.token !== '') {
      router.push('/');
    } else {
      return (
        <>
          <LoginComponent />
        </>
      );
    }
  }
  return <>{CONSTANTS?.ALLOW_GUEST_TO_ACCESS_SITE_EVEN_WITHOUT_AUTHENTICATION ? <LoginComponent /> : checkIfUserIsAuthorized()}</>;
};

export async function getServerSideProps(context: any) {
  const method = 'get_meta_tags';
  const version = 'v1';
  const entity = 'seo';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const url = `${context.resolvedUrl.split('?')[0]}`;
  if (CONSTANTS.ENABLE_META_TAGS) {
    let meta_data: any = await MetaTag(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}&page_name=${url}`);
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
export default login;
