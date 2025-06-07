// firebase-config.js
// Mi-Vault Firebase configuration and helpers
// ------------------------------------------
// Replace every “YOUR_…” placeholder with the real values
// from your Firebase project settings.

import { initializeApp } from "firebase/app";
import { getAuth }       from "firebase/auth";
import { getFirestore }  from "firebase/firestore";
import { getStorage }    from "firebase/storage";

/* ――― 1) CORE CONFIG ――― */
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

/* ――― 2) INITIALISE APP & SERVICES ――― */
const app     = initializeApp(firebaseConfig);
const auth    = getAuth(app);        // user / admin login
const db      = getFirestore(app);   // vault metadata & links
const storage = getStorage(app);     // file uploads

/* ――― 3) ADMIN MASTER PASSWORD (edit if you change it) ――― */
export const ADMIN_PASSWORD = "Admin@200998";  // case-sensitive

/* ――― 4) EXPORT EVERYTHING NEEDED ELSEWHERE ――― */
export { app, auth, db, storage };
