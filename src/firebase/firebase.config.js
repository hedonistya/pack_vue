import firebase from "firebase/compat";
import "firebase/firestore";
import "firebase/auth";
// import { seedDatabase } from "./data";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCsVsRvTCBiZ7Ebpfu9AtjROQ3x__JPcEw",
  authDomain: "pack-f2614.firebaseapp.com",
  projectId: "pack-f2614",
  storageBucket: "pack-f2614.appspot.com",
  messagingSenderId: "309953637370",
  appId: "1:309953637370:web:4363a93332c9aed0ef1243"
};

// Инициализация firebase
const Firebase = firebase.initializeApp(FIREBASE_CONFIG);

// Экспорт данных в firebase
// seedDatabase(Firebase);

export {
  Firebase
};
