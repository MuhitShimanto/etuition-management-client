import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyApBGeQOpAsqbBibsWaYiLv-zlDOMxvoGY",
  authDomain: "etuition-management.firebaseapp.com",
  projectId: "etuition-management",
  storageBucket: "etuition-management.firebasestorage.app",
  messagingSenderId: "901577146176",
  appId: "1:901577146176:web:fe9c9305ab9454dea884a5"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)