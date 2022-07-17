import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAl_nUEg81tBdSHEv2B-Ewy18d-uWbqdoY',
  authDomain: 'docs-14c2a.firebaseapp.com',
  projectId: 'docs-14c2a',
  storageBucket: 'docs-14c2a.appspot.com',
  messagingSenderId: '836922797610',
  appId: '1:836922797610:web:e63efe1362930206b85d53',
};

const app = !firebase.app.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export {db};
