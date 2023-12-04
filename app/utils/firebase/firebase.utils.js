// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiGrdsYI0ailLngimOTTa6lhl6758mHNc",
  authDomain: "fir-project-995e6.firebaseapp.com",
  projectId: "fir-project-995e6",
  storageBucket: "fir-project-995e6.appspot.com",
  messagingSenderId: "402016101230",
  appId: "1:402016101230:web:726806e85582a23942177f",
  measurementId: "G-3LY8TYZNZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Google Authentication
const gprovider = new GoogleAuthProvider();

gprovider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, gprovider);

export const db = getFirestore();

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}
export const createUserProfileDocument = async(userAuth, additionalInformation = {}) => {
  console.log('this is the userAuth, ', userAuth);
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userAuth);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const {displayName, email, photoURL} = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        photoURL,
        createAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  return userDocRef;
}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth, email,password);
}

export const signOutAuthUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);


export const blogStorage = getStorage(app);