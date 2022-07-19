import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAl_nUEg81tBdSHEv2B-Ewy18d-uWbqdoY',
  authDomain: 'docs-14c2a.firebaseapp.com',
  projectId: 'docs-14c2a',
  storageBucket: 'docs-14c2a.appspot.com',
  messagingSenderId: '836922797610',
  appId: '1:836922797610:web:4e03caa0cefe3876b85d53',
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log(db);

export { db };
