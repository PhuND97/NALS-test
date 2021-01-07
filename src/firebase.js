import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAvhaqdI3eGhO848PdJ97PaC4X9bzTvh2A',
  authDomain: 'nals-test.firebaseapp.com',
  projectId: 'nals-test',
  storageBucket: 'nals-test.appspot.com',
  messagingSenderId: '849731759100',
  appId: '1:849731759100:web:6080ae1fa9dd182fcde079'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
