importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '418835235707',
});

const messaging = firebase.messaging();

// export const initializeFirebase = () => {
//   const firebaseConfig = {
//     messagingSenderId: "418835235707",
//     projectId: "test-web-push-a2336",
//     apiKey: "AIzaSyDN4CdmegnU636eD7peIPctuPhM4UtaIq8",
//     appId: "1:418835235707:web:600b74e364068af64c73de",
//     authDomain: "test-web-push-a2336.firebaseapp.com",
//     storageBucket: "test-web-push-a2336.appspot.com",
//     measurementId: "G-61W9QD50GF"
//   };
//   initializeApp(firebaseConfig);
// };

// initializeFirebase();

// const firebaseConfig = {
//   apiKey: "AIzaSyDN4CdmegnU636eD7peIPctuPhM4UtaIq8",
//   authDomain: "test-web-push-a2336.firebaseapp.com",
//   projectId: "test-web-push-a2336",
//   messagingSenderId: '418835235707',
//   appId: "1:418835235707:web:600b74e364068af64c73de",
// };

// firebase.initializeApp(firebaseConfig);

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', async () => {
//       const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
//     });
//   }
