import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyDCiyzffb3G9uQ4ZkLX1LmZL6tucz9iMWc",
    authDomain: "alumni-website-4ddbb.firebaseapp.com",
    projectId: "alumni-website-4ddbb",
    storageBucket: "alumni-website-4ddbb.appspot.com",
    messagingSenderId: "904192706505",
    appId: "1:904192706505:web:d49189099396d55c7f8a18",
    measurementId: "G-QLHRLGZJ07"
};

export const app = initializeApp(firebaseConfig);//can comuniacte with the firebase app

export const messaging = getMessaging(app);