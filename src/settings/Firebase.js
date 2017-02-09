import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyDCJk2-nXOB5fVUu8dlwLq4mQMym-4-vYw",
    authDomain: "myfridge-b4979.firebaseapp.com",
    databaseURL: "https://myfridge-b4979.firebaseio.com",
    storageBucket: "myfridge-b4979.appspot.com",
    messagingSenderId: "854487787525"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);