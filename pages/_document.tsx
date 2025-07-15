import { Html, Head, Main, NextScript } from 'next/document';
import { CONSTANTS } from '../services/config/app-config';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href={`${CONSTANTS.API_BASE_URL}`} />
        <meta property="og:title" content={CONSTANTS.META_TITLE} />
        <meta name="description" content={CONSTANTS.META_DESCRIPTION} />
        <meta property="og:title" content={CONSTANTS.META_TITLE} />
        <meta property="og:description" content={CONSTANTS.META_DESCRIPTION} />
        <meta property="og:image" content={CONSTANTS.OG_META_IMAGE} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <link rel="canonical" href="$OG_URL" />

        {/* Icons */}
        <link rel="icon" href={CONSTANTS.META_FAVICON} />
        <link rel="icon" type="image/png" sizes="32x32" href={CONSTANTS.META_FAVICON || "/favicon-32x32.png"} />
        <link rel="icon" type="image/png" sizes="16x16" href={CONSTANTS.META_FAVICON || "/favicon-16x16.png"} />
        <link rel="apple-touch-icon" sizes="180x180" href={CONSTANTS.META_FAVICON || "/apple-touch-icon.png"} />
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
