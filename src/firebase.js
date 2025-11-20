// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Use env vars if available; fallback to existing literals
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyDn6vSCXGSmfJIQuvW_bcSS7QVnURKNjy4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "cps714-fee03.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "cps714-fee03",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "cps714-fee03.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "1055955634414",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:1055955634414:web:987d0644cf7c5f3a7a4bff",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-TEPHLL1F8F",
};

// Avoid re-initializing during HMR
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Core services (safe on server/client)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Client-only, lazy analytics loader to prevent SSR/prerender crashes
export const loadAnalytics = async () => {
  if (typeof window === 'undefined') return null;
  try {
    const { isSupported, getAnalytics } = await import('firebase/analytics');
    if (await isSupported()) {
      return getAnalytics(app);
    }
  } catch {
    // ignore analytics errors in unsupported envs
  }
  return null;
};

export default app;