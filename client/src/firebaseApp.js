import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBxA3sLixWJV9EGpGh6o_73wkMDfy5bmCc",
  authDomain: "map-project-f6ce0.firebaseapp.com",
  projectId: "map-project-f6ce0",
  storageBucket: "map-project-f6ce0.appspot.com",
  messagingSenderId: "856027241730",
  appId: "1:856027241730:web:6c8c2d63e75c38d8abb61b",
  measurementId: "G-W4J7GZCFGE"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
