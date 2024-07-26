import { Html, Head, Main, NextScript } from 'next/document';
import { CONSTANTS } from '../services/config/app-config';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
