// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEJz5Sp4cSLv2hldBWK4KTV7f73OB--r4",
  authDomain: "nwitter-33a03.firebaseapp.com",
  projectId: "nwitter-33a03",
  storageBucket: "nwitter-33a03.appspot.com",
  messagingSenderId: "520270735961",
  appId: "1:520270735961:web:48df0081cd1b82a7699f48",
  measurementId: "G-LF601KCZ9E"
};

// Initialize Firebase
export default initializeApp(firebaseConfig);