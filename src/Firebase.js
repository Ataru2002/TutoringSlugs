import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

// stores the information of the firebase at work

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9ds9N44U4LmvCUZ6eE1HIAsv4ELrWPwo",
  authDomain: "tutoringslugemergence.firebaseapp.com",
  projectId: "tutoringslugemergence",
  storageBucket: "tutoringslugemergence.appspot.com",
  messagingSenderId: "233830887681",
  appId: "1:233830887681:web:fd0e7ecaa39118b4f42b00",
  measurementId: "G-1VZV18LX6Q"
};
initializeApp(firebaseConfig);

const auth = getAuth();

var firebase = {
    auth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
}

export default firebase;
