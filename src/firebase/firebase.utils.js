import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// firebase config object obtained from console
const config = {
  apiKey: "AIzaSyB_ep-0Bldo8qcJVnR0hQzPOKJeRBEKaqY",
  authDomain: "crwn-clothing-db-e9c46.firebaseapp.com",
  databaseURL: "https://crwn-clothing-db-e9c46.firebaseio.com",
  projectId: "crwn-clothing-db-e9c46",
  storageBucket: "crwn-clothing-db-e9c46.appspot.com",
  messagingSenderId: "435743727975",
  appId: "1:435743727975:web:c5c745ab77c202da658fc2",
  measurementId: "G-0PHTG9Q4FY"
};

//initialize the app with the config
firebase.initializeApp(config);

// export select firebase services for access by the app
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//setup the google auth provider as one of the auth provider in the app
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// export the signInWithGoogle function so that it can be used as a provided via popUp window, in the app
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// export firebase to app
export default firebase;
