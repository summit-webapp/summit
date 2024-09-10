// import firebase, { initializeApp } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, deleteToken } from 'firebase/messaging';
import { requestPermission } from 'firebase/messaging';

export const initializeFirebase = () => {
  const firebaseConfig = {
    messagingSenderId: '418835235707',
    projectId: 'test-web-push-a2336',
    apiKey: 'AIzaSyDN4CdmegnU636eD7peIPctuPhM4UtaIq8',
    appId: '1:418835235707:web:600b74e364068af64c73de',
    authDomain: 'test-web-push-a2336.firebaseapp.com',
    storageBucket: 'test-web-push-a2336.appspot.com',
    measurementId: 'G-61W9QD50GF',
  };
  initializeApp(firebaseConfig);
};

export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = getMessaging();
    const currentToken = await getToken(messaging);

    // if (currentToken) {
    //   // Token exists, delete the token
    //   await deleteToken(messaging, currentToken);
    //   console.log("Deleted existing token:", currentToken);
    // }

    // const newToken = await getToken(messaging);
    // console.log('New token:', currentToken);

    return newToken;
  } catch (error) {
    // console.log('Error:', error);
  }
};

// export const askForPermissionToReceiveNotifications = async () => {
//   console.log("Ask for permission");
//   console.log("request permission", requestPermission);
//   try {
//     const messaging = getMessaging();
//     // await requestPermission();
//     const token = await getToken(messaging);
//     console.log("User token:", token);
//     return token;
//   } catch (error) {
//     console.log("err in catch");
//     console.error(error);
//   }
// };

// export const askForPermissionToReceiveNotifications = () =>
// {
//   const messaging = getMessaging();
//   getToken(messaging).then((currentToken) => {
//     if (currentToken) {
//       // Token exists, proceed with unsubscribe
//       deleteToken(messaging, currentToken)
//         .then(() => {
//           console.log("Token unsubscribed successfully");

//           // Subscribe to a new token
//           getToken(messaging)
//             .then((newToken) => {
//               console.log("Subscribed to new token:", newToken);
//               // Use the new token for sending notifications or other operations
//             })
//             .catch((error) => {
//               console.log("Error retrieving new token:", error);
//             });
//         })
//         .catch((error) => {
//           console.log("Error unsubscribing token:", error);
//         });
//     } else {
//       console.log("Token does not exist, no need to unsubscribe");
//     }
//   }).catch((error) => {
//     console.log("Error retrieving token:", error);
//   });
// }
