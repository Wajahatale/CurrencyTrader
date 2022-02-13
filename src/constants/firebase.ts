import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDOTIDLir_tHODLGV9uoqVJ8-AQOrSMGBc",
  authDomain: "currencyapp-e6d0a.firebaseapp.com",
  projectId: "currencyapp-e6d0a",
  storageBucket: "currencyapp-e6d0a.appspot.com",
  messagingSenderId: "713078713902",
  appId: "1:713078713902:web:c644cc438abf3282fcb9bf"
};


//firebase.initializeApp(firebaseConfig);
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }else {
//   firebase.app(); // if already initialized, use that one
// }

export let app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()