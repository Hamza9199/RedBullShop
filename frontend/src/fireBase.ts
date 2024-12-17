import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

export const firebaseConfig = {

    apiKey: "AIzaSyDNwnJjEK4wCr53Mmv8T5cI7gYiOL4AN8E",

    authDomain: "trailerflix-25df2.firebaseapp.com",

    projectId: "trailerflix-25df2",

    storageBucket: "trailerflix-25df2.appspot.com",

    messagingSenderId: "638760555146",

    appId: "1:638760555146:web:b0d70371cdea3ead6ad373",

    measurementId: "G-Q6CQJ9G95T"
    
  };
  
  

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export default storage;
