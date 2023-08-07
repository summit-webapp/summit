const installEvent = () => {
  self.addEventListener("install", () => {
    console.log("service worker installed");
  });
};
installEvent();

const activateEvent = () => {
  self.addEventListener("activate", () => {
    console.log("service worker activated");
  });
};
activateEvent();

// self.addEventListener("push", (event) => {
//   const data = event.data.json();
//   const title = data.title;
//   const body = data.message;
//   const icon = "some-icon.png";
//   const notificationOptions = {
//     body: body,
//     tag: "simple-push-notification-example",
//     icon: icon,
//   };

//   return self.Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       return new self.Notification(title, notificationOptions);
//     }
//   });
// });
