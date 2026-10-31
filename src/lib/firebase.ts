import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  Firestore,
  Unsubscribe,
} from "firebase/firestore";
import type { SSATRegistrationRecord } from "./ssatDatabase";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const FIREBASE_CONFIG_STORAGE_KEY = "shiksharthi_firebase_config";

/**
 * Get current Firebase configuration.
 * Checks environment variables first, then localStorage config.
 */
export function getFirebaseConfig(): FirebaseConfig | null {
  const env = (import.meta as any).env || {};

  // 1. Check Vite Environment variables
  if (env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID) {
    return {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || `${env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || `${env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: env.VITE_FIREBASE_APP_ID || "",
    };
  }

  // 2. Check localStorage config
  try {
    const raw = localStorage.getItem(FIREBASE_CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.apiKey && parsed.projectId) {
        return parsed as FirebaseConfig;
      }
    }
  } catch {
    // ignore
  }

  return null;
}

/**
 * Save Firebase configuration to localStorage (can be pasted in the Admin UI).
 */
export function saveFirebaseConfig(config: FirebaseConfig): void {
  localStorage.setItem(FIREBASE_CONFIG_STORAGE_KEY, JSON.stringify(config));
  // Reload app to re-initialize firebase with new credentials
  window.location.reload();
}

/**
 * Clear Firebase configuration.
 */
export function clearFirebaseConfig(): void {
  localStorage.removeItem(FIREBASE_CONFIG_STORAGE_KEY);
  window.location.reload();
}

/**
 * Initialize Firebase App safely.
 */
let app: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;

export function getFirebaseDb(): Firestore | null {
  if (firestoreDb) return firestoreDb;

  const config = getFirebaseConfig();
  if (!config) return null;

  try {
    app = getApps().length > 0 ? getApp() : initializeApp(config);
    firestoreDb = getFirestore(app);
    return firestoreDb;
  } catch (err) {
    console.error("Failed to initialize Firebase:", err);
    return null;
  }
}

const COLLECTION_NAME = "ssat_registrations";

/**
 * Save registration directly to Firestore collection.
 */
export async function saveRegistrationToFirebase(record: SSATRegistrationRecord): Promise<{ success: boolean; error?: string }> {
  const db = getFirebaseDb();
  if (!db) {
    return { success: false, error: "Firebase not configured" };
  }

  try {
    const ref = doc(db, COLLECTION_NAME, record.regId);
    await setDoc(ref, {
      ...record,
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (err: any) {
    console.error("Firebase save error:", err);
    return { success: false, error: err.message || "Failed to save to Firestore" };
  }
}

/**
 * Fetch all registrations from Firestore.
 */
export async function fetchRegistrationsFromFirebase(): Promise<SSATRegistrationRecord[]> {
  const db = getFirebaseDb();
  if (!db) return [];

  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy("registeredAt", "desc"));
    const snapshot = await getDocs(q);

    const records: SSATRegistrationRecord[] = [];
    snapshot.forEach((d) => {
      records.push(d.data() as SSATRegistrationRecord);
    });

    return records;
  } catch (err) {
    console.error("Firebase fetch error:", err);
    return [];
  }
}

/**
 * Subscribe to real-time registrations updates from Firestore.
 */
export function subscribeToRegistrationsFirebase(
  onUpdate: (records: SSATRegistrationRecord[]) => void,
  onError?: (err: any) => void
): Unsubscribe | null {
  const db = getFirebaseDb();
  if (!db) return null;

  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy("registeredAt", "desc"));

    return onSnapshot(
      q,
      (snapshot) => {
        const records: SSATRegistrationRecord[] = [];
        snapshot.forEach((d) => {
          records.push(d.data() as SSATRegistrationRecord);
        });
        onUpdate(records);
      },
      (err) => {
        console.error("Firebase listener error:", err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    console.error("Firebase subscription error:", err);
    return null;
  }
}

/**
 * Delete a registration from Firestore.
 */
export async function deleteRegistrationFromFirebase(regId: string): Promise<boolean> {
  const db = getFirebaseDb();
  if (!db) return false;

  try {
    await deleteDoc(doc(db, COLLECTION_NAME, regId));
    return true;
  } catch (err) {
    console.error("Firebase delete error:", err);
    return false;
  }
}
