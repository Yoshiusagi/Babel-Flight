// Public Firebase web config for Babel Flight accounts.
// These values identify the Firebase project and are meant to be shipped to browsers
// (they are not secrets). Leave it null to keep sign-in hidden.
export type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
};

export const FIREBASE_WEB_CONFIG: FirebaseWebConfig | null = {
  apiKey: "AIzaSyA6ZI7FwvH5AhgyMxCWA1_f6vhgOMg-7M8",
  authDomain: "babel-flight.firebaseapp.com",
  projectId: "babel-flight",
  appId: "1:996646179203:web:e9ca00d1555833a4e8e6b6",
};

// Sign-in methods the app offers; tokens from any other provider are rejected.
export const ALLOWED_PROVIDERS: readonly string[] = ["google.com", "apple.com", "password"];
