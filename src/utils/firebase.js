import firebase from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
  apiKey: `${process.env.VUE_APP_APIKEY}`,
  authDomain: `${process.env.VUE_APP_AUTHDOMAIN}`,
  projectId: `${process.env.VUE_APP_PROJECTID}`,
  storageBucket: `${process.env.VUE_APP_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.VUE_APP_MESSAGINGSENDERID}`,
  appId: `${process.env.VUE_APP_APPID}`,
  measurementId: `${process.env.VUE_APP_MEASUREMENTID}`,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Utils
const auth = firebase.auth();

// Exports
export {auth}