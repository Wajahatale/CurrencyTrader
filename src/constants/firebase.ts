import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREFOX_API_KEY,
  authDomain: process.env.FIREFOX_Auth_Domain,
  projectId: process.env.FIREFOX_Project_ID,
  storageBucket: process.env.FIREFOX_Storage_Bucket,
  messagingSenderId: process.env.FIREFOX_MessagingSenderId,
  appId: process.env.APP_ID,
};

//firebase.initializeApp(firebaseConfig);
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }else {
//   firebase.app(); // if already initialized, use that one
// }

export let app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
