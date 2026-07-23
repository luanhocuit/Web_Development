import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVUd9Rs6PMOyj7GpRaLs8PhqZvKqiw9BQ",
  authDomain: "web-register-55260.firebaseapp.com",
  projectId: "web-register-55260",
  storageBucket: "web-register-55260.firebasestorage.app",
  messagingSenderId: "353145911207",
  appId: "1:353145911207:web:536331c7973a3809e56882",
  measurementId: "G-BYMNBJF81X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);