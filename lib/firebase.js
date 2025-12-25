import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIOwNFgeGqB-74Ug5zt6Vr2RmwlaXCQmE",
  authDomain: "tasks-fd7a2.firebaseapp.com",
  projectId: "tasks-fd7a2",
  storageBucket: "tasks-fd7a2.firebasestorage.app",
  messagingSenderId: "285906470188",
  appId: "1:285906470188:web:53855b94a3759dc1df1889"
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();