import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

firebase.initializeApp(
    {
        apiKey: "AIzaSyAA_tO_im809fBirDTDjHa6wGN3UFfbqOY",
        authDomain: "reels-cee26.firebaseapp.com",
        projectId: "reels-cee26",
        storageBucket: "reels-cee26.appspot.com",
        messagingSenderId: "55770361252",
        appId: "1:55770361252:web:5fbe53a89663a810022531"
    }
)
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const storage = firebase.storage();

export const database = {
    users: firestore.collection("Users"),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}