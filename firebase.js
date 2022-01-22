// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getStorage, getDownloadURL, ref} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDidrsmMuPp6x74Ye1DRf6vM3N0Q6XFpk0",
  authDomain: "scrapegoats.firebaseapp.com",
  projectId: "scrapegoats",
  storageBucket: "scrapegoats.appspot.com",
  messagingSenderId: "780149071742",
  appId: "1:780149071742:web:a303e4563f6bf65bafdd2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

console.log("auth", auth)

export { auth, storage }
