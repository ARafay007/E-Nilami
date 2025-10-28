// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcu6iXitfaz4p1kadYfRDP6qhdXKc-lJo",
  authDomain: "e-nilami-4694b.firebaseapp.com",
  projectId: "e-nilami-4694b",
  storageBucket: "e-nilami-4694b.firebasestorage.app",
  messagingSenderId: "361448531872",
  appId: "1:361448531872:web:e43f71b4fa3ada528b26c5",
  measurementId: "G-TCBVPD463J",
  databaseURL: "https://e-nilami-4694b-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getDatabase(app);
// const analytics = getAnalytics(app);


