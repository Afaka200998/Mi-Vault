// — Import Firebase modules —
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";

// — Your Firebase Configuration —
const firebaseConfig = {
  apiKey: "AIzaSyCChmtjcC3VN_CNQ06lsBH0a5ZrWbH6teI",
  authDomain: "mi-site-200998.firebaseapp.com",
  projectId: "mi-site-200998",
  storageBucket: "mi-site-200998.appspot.com",
  messagingSenderId: "337208314860",
  appId: "1:337208314860:web:a5399ce8eb7b3ea6a30ec9",
  measurementId: "G-9C0MLQY55S"
};

// — Initialize Firebase —
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// — Export to other scripts —
export { app, db, storage };
