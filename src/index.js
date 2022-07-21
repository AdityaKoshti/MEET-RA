import {initializeApp} from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyC3tSdioRbcufHh0oIo67bwqDw8k8fVgT8",
    authDomain: "meet-5bfa8.firebaseapp.com",
    projectId: "meet-5bfa8",
    storageBucket: "meet-5bfa8.appspot.com",
    messagingSenderId: "796528308032",
    appId: "1:796528308032:web:c098b86fcee4587af4d4a5",
    measurementId: "G-M8SGE5F06J"
};

//Initialise firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });


  // Sign In
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  module.exports = {createUserWithEmailAndPassword, signInWithEmailAndPassword}