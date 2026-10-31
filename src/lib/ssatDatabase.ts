/**
 * SSAT Registration Database
 * Stores registration records in localStorage for persistence.
 */

export interface SSATRegistrationRecord {
  regId: string;
  studentName: string;
  schoolName: string;
  board: string;
  studentMobile: string;
  parentMobile: string;
  email: string;
  examDate: string;
  consent: boolean;
  registeredAt: string; // ISO timestamp
}

const STORAGE_KEY = "ssat_registrations";
const WEBHOOK_KEY = "ssat_google_sheet_webhook_url";

/**
 * Get configured Google Sheet Webhook URL.
 * Checks environment variable first, then localStorage.
 */
export function getGoogleSheetWebhookUrl(): string {
  const envUrl = (import.meta as any).env?.VITE_SSAT_SHEET_URL;
  if (envUrl && typeof envUrl === "string" && envUrl.trim().length > 0) {
    return envUrl.trim();
  }
  return localStorage.getItem(WEBHOOK_KEY) || "";
}

/**
 * Save Google Sheet Webhook URL.
 */
export function setGoogleSheetWebhookUrl(url: string): void {
  const trimmed = url.trim();
  if (trimmed) {
    localStorage.setItem(WEBHOOK_KEY, trimmed);
  } else {
    localStorage.removeItem(WEBHOOK_KEY);
  }
}

/**
 * Submit registration record to Google Sheet Webhook (asynchronously).
 */
export async function submitToGoogleSheet(record: SSATRegistrationRecord): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = getGoogleSheetWebhookUrl();
  if (!webhookUrl) {
    return { success: false, error: "No Google Sheet Webhook configured" };
  }

  try {
    // Send payload. Google Apps Script Web App accepts text/plain or application/json.
    // Using no-cors ensures Google's 302 redirects don't fail due to browser CORS policies.
    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(record),
    });
    return { success: true };
  } catch (err: any) {
    console.warn("Failed to sync to Google Sheet:", err);
    return { success: false, error: err.message || "Network error" };
  }
}

/**
 * Fetch registrations from Google Sheet Webhook.
 */
export async function fetchFromGoogleSheet(): Promise<{ success: boolean; records?: SSATRegistrationRecord[]; error?: string }> {
  const webhookUrl = getGoogleSheetWebhookUrl();
  if (!webhookUrl) {
    return { success: false, error: "No Google Sheet Webhook configured" };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const json = await res.json();
    if (json.status === "success" && Array.isArray(json.data)) {
      // Merge cloud records into local storage cache
      const cloudRecords: SSATRegistrationRecord[] = json.data;
      const localRecords = getAllRegistrations();
      const localIds = new Set(localRecords.map((r) => r.regId));

      const merged = [...localRecords];
      cloudRecords.forEach((c) => {
        if (!localIds.has(c.regId)) {
          merged.push(c);
        }
      });

      // Save merged to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return { success: true, records: getAllRegistrations() };
    }
    return { success: false, error: json.message || "Invalid response format" };
  } catch (err: any) {
    console.error("Error fetching from Google Sheet:", err);
    return { success: false, error: err.message || "Failed to fetch cloud records" };
  }
}

import {
  saveRegistrationToFirebase,
  deleteRegistrationFromFirebase,
  getFirebaseDb,
} from "./firebase";

/**
 * Get all SSAT registration records from local cache, newest first.
 */
export function getAllRegistrations(): SSATRegistrationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SSATRegistrationRecord[];
    // Return newest first
    return parsed.sort(
      (a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
    );
  } catch {
    return [];
  }
}

/**
 * Add a new registration record. Saves to local storage and syncs to Firebase.
 */
export function addRegistration(record: SSATRegistrationRecord): void {
  const existing = getAllRegistrations();
  if (!existing.some((r) => r.regId === record.regId)) {
    existing.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }

  // Push to Firebase Firestore in background
  saveRegistrationToFirebase(record).catch((err) => {
    console.warn("Could not save to Firebase:", err);
  });
}

/**
 * Get a single registration by regId.
 */
export function getRegistrationById(regId: string): SSATRegistrationRecord | undefined {
  return getAllRegistrations().find((r) => r.regId === regId);
}

/**
 * Delete a registration by regId from local cache and Firebase.
 */
export function deleteRegistration(regId: string): void {
  const existing = getAllRegistrations().filter((r) => r.regId !== regId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

  // Delete from Firebase Firestore
  deleteRegistrationFromFirebase(regId).catch((err) => {
    console.warn("Could not delete from Firebase:", err);
  });
}

/**
 * Clear all registrations (use with caution).
 */
export function clearAllRegistrations(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get total count of registrations.
 */
export function getRegistrationCount(): number {
  return getAllRegistrations().length;
}

/**
 * Export registrations as CSV string.
 */
export function exportRegistrationsCSV(): string {
  const records = getAllRegistrations();
  if (records.length === 0) return "";

  const headers = [
    "Registration ID",
    "Student Name",
    "School Name",
    "Board",
    "Student Mobile",
    "Parent Mobile",
    "Email",
    "Exam Date",
    "Registered At",
  ];

  const rows = records.map((r) => [
    r.regId,
    `"${r.studentName}"`,
    `"${r.schoolName}"`,
    r.board,
    r.studentMobile,
    r.parentMobile,
    r.email || "-",
    r.examDate,
    new Date(r.registeredAt).toLocaleString("en-IN"),
  ]);

  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
}

/**
 * Trigger browser download of registrations CSV file.
 */
export function downloadRegistrationsCSV(): void {
  const csv = exportRegistrationsCSV();
  if (!csv) return;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateStr = new Date().toISOString().split("T")[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `ssat-registrations-${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Seed realistic sample registrations for preview / testing.
 */
export function seedSampleRegistrations(): void {
  const samples: SSATRegistrationRecord[] = [
    {
      regId: "SSAT26-A8K2M",
      studentName: "Aarav Mukherjee",
      schoolName: "South Point High School",
      board: "CBSE",
      studentMobile: "9830123456",
      parentMobile: "9830987654",
      email: "aarav.mukherjee@gmail.com",
      examDate: "15 November 2026",
      consent: true,
      registeredAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    },
    {
      regId: "SSAT26-B9L3P",
      studentName: "Ananya Sengupta",
      schoolName: "St. Xavier's Collegiate School",
      board: "ICSE",
      studentMobile: "9831234567",
      parentMobile: "9831876543",
      email: "ananya.sen@outlook.com",
      examDate: "15 November 2026",
      consent: true,
      registeredAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    },
    {
      regId: "SSAT26-C4M7R",
      studentName: "Debjit Roy",
      schoolName: "Ballygunge Government High School",
      board: "WB Board",
      studentMobile: "9832345678",
      parentMobile: "9832765432",
      email: "debjit.roy2010@gmail.com",
      examDate: "22 November 2026",
      consent: true,
      registeredAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
      regId: "SSAT26-D5N8T",
      studentName: "Ishita Banerjee",
      schoolName: "Modern High School for Girls",
      board: "ICSE",
      studentMobile: "9833456789",
      parentMobile: "9833654321",
      email: "ishita.b@gmail.com",
      examDate: "22 November 2026",
      consent: true,
      registeredAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
    },
    {
      regId: "SSAT26-E6P9W",
      studentName: "Soumyadeep Chatterjee",
      schoolName: "Delhi Public School, Ruby Park",
      board: "CBSE",
      studentMobile: "9834567890",
      parentMobile: "9834543210",
      email: "",
      examDate: "15 November 2026",
      consent: true,
      registeredAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    },
  ];

  const current = getAllRegistrations();
  // Don't duplicate IDs if already present
  const currentIds = new Set(current.map((c) => c.regId));
  const newSamples = samples.filter((s) => !currentIds.has(s.regId));
  const combined = [...current, ...newSamples];
  localStorage.setItem("ssat_registrations", JSON.stringify(combined));
}
