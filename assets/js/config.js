import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
import {
  getDatabase,
  set,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBr60Coz79zGTL6IUoiY1b7hqWQ6WFPFfI",
  authDomain: "blog-uolode.firebaseapp.com",
  projectId: "blog-uolode",
  storageBucket: "blog-uolode.appspot.com",
  messagingSenderId: "912272823386",
  appId: "1:912272823386:web:869a2357b65d2dc917b463",
  measurementId: "G-5TKC9V1GLR",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const realdb = getDatabase(app);

export {
  storage,
  realdb,
  sRef,
  uploadBytesResumable,
  getDownloadURL,
  ref,
  set,
  get,
  child,
};
