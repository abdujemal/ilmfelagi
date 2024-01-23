import { initializeApp, getApps, getApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDdVoEyqtfRdmKSYJIdnrys-TKow_LNb0A",
  authDomain: "completed-full-lectures.firebaseapp.com",
  databaseURL: "https://completed-full-lectures-default-rtdb.firebaseio.com",
  projectId: "completed-full-lectures",
  storageBucket: "completed-full-lectures.appspot.com",
  messagingSenderId: "289944837560",
  appId: "1:289944837560:web:0a8b1f142b4ba733be834d",
  measurementId: "G-GG7DYTFWV3"
};

const app = initializeApp(firebaseConfig)


export default app