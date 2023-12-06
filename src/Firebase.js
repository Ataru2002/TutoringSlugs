import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

// stores the information of the firebase at work

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAr9AWEzY55OMgNGJLRPNkeg3EIv7rT52A",
    authDomain: "tutoringslugs.firebaseapp.com",
    projectId: "tutoringslugs",
    storageBucket: "tutoringslugs.appspot.com",
    messagingSenderId: "577248810803",
    appId: "1:577248810803:web:5807a43fb92cd400075046",
    measurementId: "G-BNWVD69VNX",
};

initializeApp(firebaseConfig);
const auth = getAuth();

var firebase = {
    auth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
}

export default firebase;
