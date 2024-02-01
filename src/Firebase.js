// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  GoogleAuthProvider,

  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  Query,
  getDoc,
} from "firebase/firestore";
import { Navigate } from "react-router-dom";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmYwdjtke7zuhhbgndF213v88zYP9liuc",
  authDomain: "authentication-demo-7b568.firebaseapp.com",
  projectId: "authentication-demo-7b568",
  storageBucket: "authentication-demo-7b568.appspot.com",
  messagingSenderId: "381468209731",
  appId: "1:381468209731:web:2e8e2f50c4e2044f3c9af6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider()


const signinwithgoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = Response.user
    const qry = Query(collection(db, "users"), where("uid", "==", user.uid))
    const docs = await getDoc(qry)
    if (docs.docs.length == 0) {
      await addDoc(collection(db, "users", {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email
      }))
    }
  } catch (error) {
    console.log(error);
  }
}

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error)
  }
}

const registerWithEmailAndPassowrd = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    const user = response.user
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  } catch (error) {

  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    alert("password reset mail is sent")
  } catch (error) {
    console.log(error)
  }
}

const logOut = () => {
  signOut(auth)

}

export {
  auth,
  db,
  signinwithgoogle,
  loginWithEmailAndPassword,
  registerWithEmailAndPassowrd,
  sendPasswordReset,
  logOut
};