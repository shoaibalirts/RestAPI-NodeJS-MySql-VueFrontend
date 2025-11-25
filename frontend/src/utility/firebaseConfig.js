// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvQ1NnKlU4_Qla8FKC-joB62nnKjmJSjg",
  authDomain: "min-indkoebsliste.firebaseapp.com",
  projectId: "min-indkoebsliste",
  storageBucket: "min-indkoebsliste.firebasestorage.app",
  messagingSenderId: "823642800523",
  appId: "1:823642800523:web:5908b8f4b7845f6da26f8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app as firebaseApp, db };
