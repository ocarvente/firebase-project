// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAuth, signinWithRedirect, signInWithPopup, GoogleAuthProvider }from "firebase/auth"
import {getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
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

export const db = getFirestore(app);
const createUserDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
}