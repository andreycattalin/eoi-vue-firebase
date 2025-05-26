import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiOKdQSlYHS3x0rfcPH2rjh2n8UKND6tc",
  authDomain: "gestor-de-viajes-580a3.firebaseapp.com",
  projectId: "gestor-de-viajes-580a3",
  storageBucket: "gestor-de-viajes-580a3.firebasestorage.app",
  messagingSenderId: "372498969836",
  appId: "1:372498969836:web:721412b2b10f463587e1c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export default app