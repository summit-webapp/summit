import { Html, Head, Main, NextScript } from 'next/document';
export const config = { amp: 'hybrid' };
export default function Document() {
  let isDealer;
  if (typeof window !== 'undefined') {
    isDealer = localStorage.getItem('isDealer');
  }
  return (
    <Html>
      <Head>
        <>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0&display=swap"
            onLoad={(e) => {
              console.log('Font Loaded Successfully');
              const linkElem = e.currentTarget as HTMLLinkElement;
              linkElem.media = 'all';
            }}
          />
          {/* <!-- Font Awesome Icons --> */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            onLoad={(e) => {
              console.log('Font Loaded Successfully');
              const linkElem = e.currentTarget as HTMLLinkElement;
              linkElem.media = 'all';
            }}
          />
          {/* <!-- Google fonts --> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'anonymous'} />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Inter:wght@400;500;600;700&family=Rubik:wght@300&display=swap"
            rel="stylesheet"
            onLoad={(e) => {
              console.log('Font Loaded Successfully');
              const linkElem = e.currentTarget as HTMLLinkElement;
              linkElem.media = 'all';
            }}
          />
          {/* <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com"> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
            rel="stylesheet"
            onLoad={(e) => {
              console.log('Font Loaded Successfully');
              const linkElem = e.currentTarget as HTMLLinkElement;
              linkElem.media = 'all';
            }}
          />
        </>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
