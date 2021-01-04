import firebase from 'firebase/app'
import "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

export const db = firebase.firestore()


const  timestampToDateRecursively = (value: any): any =>{
  if (value == null) {
    return value;
  } else if (value.constructor === firebase.firestore.Timestamp) {
    return value.toDate();
  } else if (Array.isArray(value)) {
    return value.map(timestampToDateRecursively);
  } else if (value.constructor === Object) {
    const converted: any = {};
    for (const key in value) {
      converted[key] = timestampToDateRecursively(value[key]);
    }
    return converted;
  } else {
    return value;
  }
}

export const wrapDocumentSnapshotData = () => {
  console.log(`Wrapping DocumentSnapshot.data()`);
  const origin = firebase.firestore.DocumentSnapshot.prototype.data;
  firebase.firestore.DocumentSnapshot.prototype.data = function () {
    const data = origin.bind(this)();
    const converted = timestampToDateRecursively(data);
    return converted;
  };
}
