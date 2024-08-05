// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAekZQOeNw5Jr9KLomJjqUqv2UTM6HQfM",
  authDomain: "inventory-management-app-fb298.firebaseapp.com",
  projectId: "inventory-management-app-fb298",
  storageBucket: "inventory-management-app-fb298.appspot.com",
  messagingSenderId: "1055408221553",
  appId: "1:1055408221553:web:fa0d3f1d2449ae6be89ad0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);