import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAwyIPqQxrfQDDACtp1vs9R_7xPR7PX7iU",
  authDomain: "supply-chain-traceabilit-2732f.firebaseapp.com",
  projectId: "supply-chain-traceabilit-2732f",
  storageBucket: "supply-chain-traceabilit-2732f.appspot.com",
  messagingSenderId: "893653351964",
  appId: "1:893653351964:web:e34f2c2ad70f60360369d9",
  measurementId: "G-EV4VEWWQ2L"
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
