import dotenv from 'dotenv';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
try {
    const result = dotenv.config()

    console.log(result.parsed)
    if (result.error) {
        console.log(result.error)
    }
} catch (err) {
    console.error(err)
}


// const config = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID
// }



// console.log(config);

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
    posts: firestore.collection('posts'),
    comments: firestore.collection('comments'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}