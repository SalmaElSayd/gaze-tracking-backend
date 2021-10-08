import * as firebase from "firebase";

// Initialize our project application found in firebase developer UI
// firebase.initializeApp({
//   apiKey: "AIzaSyDQkDf2h11tJM-ZEA77ASFK1OQ6rfQVik8",
//   authDomain: "social-media-study-app.firebaseapp.com",
//   databaseURL: "https://social-media-study-app.firebaseio.com",
//   projectId: "social-media-study-app",
//   storageBucket: "social-media-study-app.appspot.com",
//   messagingSenderId: "996207727363",
//   appId: "1:996207727363:web:f3a0d6aafe3f9d9486cf36",
// });




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
  apiKey: "AIzaSyDJxWDl5yJ9eanZSzFLqvTTvt2oFblTGls",
  authDomain: "gazetracking-6c8de.firebaseapp.com",
  projectId: "gazetracking-6c8de",
  storageBucket: "gazetracking-6c8de.appspot.com",
  messagingSenderId: "343384414487",
  appId: "1:343384414487:web:6ef6c731d59f2b5e48bf52",
  measurementId: "G-EWZR0QRNTP"
});


// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }


const database = firebase.database();


export const db = database;



// Initialize Firebase
// const app = initializeApp(firebaseConfig);

