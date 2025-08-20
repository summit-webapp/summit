import { Html, Head, Main, NextScript } from 'next/document';
import { CONSTANTS } from '../services/config/app-config';
import Script from 'next/script';
import SettingsData from '../summit-settings.json';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href={`${CONSTANTS.API_BASE_URL}`} />
        <meta property="og:title" content={SettingsData?.data?.meta_title} />
        <meta name="description" content={SettingsData?.data?.description} />
        <meta property="og:title" content={SettingsData?.data?.meta_title} />
        <meta property="og:description" content={SettingsData?.data?.description} />
        <meta property="og:image" content={`${CONSTANTS.API_BASE_URL}${SettingsData?.data?.og_image}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <link rel="canonical" href="$OG_URL" />

        {/* Icons */}
        <link rel="icon" href={`${CONSTANTS.API_BASE_URL}${SettingsData?.data?.favicon}`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${CONSTANTS.API_BASE_URL}${SettingsData?.data?.favicon}` || "/favicon-32x32.png"} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${CONSTANTS.API_BASE_URL}${SettingsData?.data?.favicon}` || "/favicon-16x16.png"} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${CONSTANTS.API_BASE_URL}${SettingsData?.data?.favicon}` || "/apple-touch-icon.png"} />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        {/* <!-- Google tag (gtag.js) --> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-X9PK6K9PE5"></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          gtag('config', 'G-X9PK6K9PE5')`}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
