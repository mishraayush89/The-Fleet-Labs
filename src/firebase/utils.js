import firebase from 'firebase/app';
import 'firebase/database';
var firebaseConfig = {
    apiKey: "AIzaSyCA3fkP_iAadzs2IhucjmmIZMhXJkV7nWo",
    authDomain: "collapse-e380c.firebaseapp.com",
    projectId: "collapse-e380c",
    storageBucket: "collapse-e380c.appspot.com",
    messagingSenderId: "1044954542650",
    appId: "1:1044954542650:web:d02bb05a8763069164bb03",
    measurementId: "G-Z73BVPPNN2"
  };

firebase.initializeApp(firebaseConfig);

export const  database = firebase.database();

export default firebase;