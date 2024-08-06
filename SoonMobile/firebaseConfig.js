// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfdWCjr5wWchk4lq0FT8YtsYh0qempy7Q",
  authDomain: "soonmobile-a14c0.firebaseapp.com",
  databaseURL: "https://soonmobile-a14c0-default-rtdb.firebaseio.com",
  projectId: "soonmobile-a14c0",
  storageBucket: "soonmobile-a14c0.appspot.com",
  messagingSenderId: "713939567140",
  appId: "1:713939567140:web:b2ab924c9424e59dceceb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };