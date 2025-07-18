// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYLVUI_D9rFJa8KHUkC0KxZIloVqIwyc8",
  authDomain: "star-car-wash-4c967.firebaseapp.com",
  projectId: "star-car-wash-4c967",
  storageBucket: "star-car-wash-4c967.firebasestorage.app",
  messagingSenderId: "1042530205662",
  appId: "1:1042530205662:web:c09bf0b34d859680aea74f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;