// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDjTlaaPTgzRA3JMuSOft2ZWeJLrjqtdw",
  authDomain: "twitter-9a003.firebaseapp.com",
  projectId: "twitter-9a003",
  storageBucket: "twitter-9a003.appspot.com",
  messagingSenderId: "604497778278",
  appId: "1:604497778278:web:51c1473fab6822220a3fa7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()