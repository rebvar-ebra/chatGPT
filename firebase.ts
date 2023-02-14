import {getApp,getApps,initializeApp} from 'firebase/app'
import {getFirestore}from 'firebase/firestore'

 // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm8hU3sn2LnUvuYkmQZo-2CSMEWdEf9uM",
  authDomain: "chat-gpt-76b2f.firebaseapp.com",
  projectId: "chat-gpt-76b2f",
  storageBucket: "chat-gpt-76b2f.appspot.com",
  messagingSenderId: "590670806847",
  appId: "1:590670806847:web:5179bf6daa6b0904931d8a"
};

// Initialize Firebase
const app =getApps().length? getApp(): initializeApp(firebaseConfig);
const db = getFirestore(app)
export{db};