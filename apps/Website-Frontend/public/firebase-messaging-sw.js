importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyDCiyzffb3G9uQ4ZkLX1LmZL6tucz9iMWc",
    authDomain: "alumni-website-4ddbb.firebaseapp.com",
    projectId: "alumni-website-4ddbb",
    storageBucket: "alumni-website-4ddbb.appspot.com",
    messagingSenderId: "904192706505",
    appId: "1:904192706505:web:d49189099396d55c7f8a18",
    measurementId: "G-QLHRLGZJ07"
};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});