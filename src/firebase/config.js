import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA3hS6bFVwI1HChijAYZrGQMlW9oftV22Q",
  authDomain: "e-commerce-ecde1.firebaseapp.com",
  projectId: "e-commerce-ecde1",
  storageBucket: "e-commerce-ecde1.appspot.com",
  messagingSenderId: "557528471896",
  appId: "1:557528471896:web:08dedca9969d0ba9482d2d"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
