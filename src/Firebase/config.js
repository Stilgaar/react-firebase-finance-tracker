import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCYHV5UCMhDSBzFghck2zhnoC-QC3IKlkk",
    authDomain: "oseille-84652.firebaseapp.com",
    projectId: "oseille-84652",
    storageBucket: "oseille-84652.appspot.com",
    messagingSenderId: "997509449588",
    appId: "1:997509449588:web:bcbffb325db9826b3d8e21"
};

firebase.initializeApp(firebaseConfig)

// timestamp

export const timestamp = firebase.firestore.Timestamp
export const projectFirestore = firebase.firestore()
export const projetAuth = firebase.auth()
