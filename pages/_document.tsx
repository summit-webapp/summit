import { Html, Head, Main, NextScript } from 'next/document';
import { CONSTANTS } from '../services/config/app-config';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href={`${CONSTANTS.API_BASE_URL}`} />
        {/* <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          onLoad={(e) => {
            const target = e.target as HTMLLinkElement;
            target.media = 'all';
          }}
        ></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" async></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
