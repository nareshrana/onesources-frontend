import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";



// const firebaseConfig = {
//   apiKey: "AIzaSyD__r3UMJgmOrgW5-bGsEPDiROzuwKWVVA",
//   authDomain: "onesource-dbb30.firebaseapp.com",
//   projectId: "onesource-dbb30",
//   storageBucket: "onesource-dbb30.appspot.com",
//   messagingSenderId: "749099745733",
//   appId: "1:749099745733:web:3bb71bb52a537681580bac",
//   measurementId: "G-FQR3X48MQ1"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBNnuLzLRR0UyIxgFSS-VvZALfUUIAdHbw",
  authDomain: "onesource-2427e.firebaseapp.com",
  databaseURL: "https://onesource-2427e-default-rtdb.firebaseio.com",
  projectId: "onesource-2427e",
  storageBucket: "onesource-2427e.appspot.com",
  messagingSenderId: "318428279694",
  appId: "1:318428279694:web:3510333a27cb1771c5aadf"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);