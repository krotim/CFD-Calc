import * as firebase from "firebase/app";
import "firebase/auth";

const config = firebase.initializeApp({
	apiKey: "AIzaSyCJrajoi4XwEvcJplp-euN-MtTfgInwnmk",
	authDomain: "cfd-calc.firebaseapp.com",
	databaseURL: "https://cfd-calc.firebaseio.com",
	projectId: "cfd-calc",
	storageBucket: "cfd-calc.appspot.com",
	messagingSenderId: "1015169217221",
	appId: "1:1015169217221:web:e93d317416e626ebeb76ac",
	measurementId: "G-TCJDD4E7YX"
	/* apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASURMENT_ID */
});

export default config;
