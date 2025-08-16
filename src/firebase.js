import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIXrXfJm0zvFpsvoWoHCnLtQUYk0r1wY8",
  authDomain: "traveljournalapp-c3a03.firebaseapp.com",
  projectId: "traveljournalapp-c3a03",
  storageBucket: "traveljournalapp-c3a03.appspot.com",
  messagingSenderId: "16137294999",
  appId: "1:16137294999:web:23ad0b6b230e324a7e85d2",
  measurementId: "G-8006C0MLHH",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
