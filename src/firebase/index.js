// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxdK7CahpKzQE0zj478LzVU1S-QnIUo8c",
  authDomain: "vue-calendar-407ef.firebaseapp.com",
  projectId: "vue-calendar-407ef",
  storageBucket: "vue-calendar-407ef.appspot.com",
  messagingSenderId: "588709100859",
  appId: "1:588709100859:web:727fd1cb4f7ed9020c8b1e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
