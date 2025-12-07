// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNmSegMa8TPbZUwHjh3Gp9tcyXkL0Iigw",
  authDomain: "myweb-6aee2.firebaseapp.com",
  projectId: "myweb-6aee2",
  storageBucket: "myweb-6aee2.firebasestorage.app",
  messagingSenderId: "990520419326",
  appId: "1:990520419326:web:87385adb3ec71bc993d6af",
  measurementId: "G-94EKT8BJVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);