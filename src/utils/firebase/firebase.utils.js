// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBIAB1YqQiyWyb8hC8hXOg6W2hoAAMqeCU",
  authDomain: "crwn-clothing-db-7cba2.firebaseapp.com",
  projectId: "crwn-clothing-db-7cba2",
  storageBucket: "crwn-clothing-db-7cba2.appspot.com",
  messagingSenderId: "591175484105",
  appId: "1:591175484105:web:37a12bb3f365310deac318",
  measurementId: "G-N3H8T22TJB",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const analytics = getAnalytics(firebaseApp);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const signOutUser = async () => await signOut(auth);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const docSnapshot = await getDoc(userDocRef);

  if (!docSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      const setDocResponse = await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
      console.log("setDocResponse: ", setDocResponse);
    } catch (error) {
      console.log("error creating user: ", error.message);
    }
  }

  return userDocRef;
};

export const createUserDocumentOnEmailAndPasswordSignUp = async (
  displayName,
  email,
  password
) => {
  if (!email || !password || !displayName) return;

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (user) {
      await createUserDocumentFromAuth(user, { displayName: displayName });
      return user;
    }
  } catch (error) {
    console.log("error creating user: ", error);
  }
};

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);