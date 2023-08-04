import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "e-commerce-ecde1.firebaseapp.com",
  projectId: "e-commerce-ecde1",
  storageBucket: "e-commerce-ecde1.appspot.com",
  messagingSenderId: "557528471896",
  appId: `${process.env.REACT_APP_FIREBASE_ID}`,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
