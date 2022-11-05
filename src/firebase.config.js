import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsBlu7hmMtr4wg4HN-syL4ZBwmUU3kZKk",
  authDomain: "linkedin-clone-fe92c.firebaseapp.com",
  projectId: "linkedin-clone-fe92c",
  storageBucket: "linkedin-clone-fe92c.appspot.com",
  messagingSenderId: "967789611762",
  appId: "1:967789611762:web:8c06f87b32c15b4028de6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
