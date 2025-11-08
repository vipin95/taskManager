// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlJp7T1WORyAy5aXT2GPrC6_mmoEYM9FM",
  authDomain: "testproject-29811.firebaseapp.com",
  projectId: "testproject-29811",
  storageBucket: "testproject-29811.firebasestorage.app",
  messagingSenderId: "215065405551",
  appId: "1:215065405551:web:da2c959aae16ab2e20859a",
  measurementId: "G-G36CPLW3QM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);