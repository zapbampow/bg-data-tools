// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF3tpp9m9ny4_YKjVzRcPB_QiR9_90sto",
  authDomain: "bg-data-tools.firebaseapp.com",
  projectId: "bg-data-tools",
  storageBucket: "bg-data-tools.appspot.com",
  messagingSenderId: "253384170563",
  appId: "1:253384170563:web:599551a1af7ca193bc88f6",
  measurementId: "G-PX20MHWLZ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };
