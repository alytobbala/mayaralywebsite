// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDygrkKGaXRe4MedTGFdgw_r-xEG0dGZVs",
  authDomain: "videos-3ff41.firebaseapp.com",
  projectId: "videos-3ff41",
  storageBucket: "videos-3ff41.firebasestorage.app",
  messagingSenderId: "188779310833",
  appId: "1:188779310833:web:18ba548ba82fb799b60350"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);