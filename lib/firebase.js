import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "-----",
  authDomain: "---------",
  projectId: "---------------",
  storageBucket: "--------------------",
  messagingSenderId: "------------",
  appId: "------------------------",
  measurementId: "----------"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize analytics only if supported (browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db, analytics };
