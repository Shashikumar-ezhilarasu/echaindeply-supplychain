'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwyIPqQxrfQDDACtp1vs9R_7xPR7PX7iU",
  authDomain: "supply-chain-traceabilit-2732f.firebaseapp.com",
  projectId: "supply-chain-traceabilit-2732f",
  storageBucket: "supply-chain-traceabilit-2732f.appspot.com",
  messagingSenderId: "893653351964",
  appId: "1:893653351964:web:7e443309fc5e11200369d9",
  measurementId: "G-7Y5REFTB3V"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
