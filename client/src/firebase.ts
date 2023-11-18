// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

export const fb = initializeApp(firebaseConfig);
export const db = initializeFirestore(fb, {})
if (db instanceof Error) {
	console.error('Error connecting to Firestore:', db.message);
} else {
	console.log('Firestore connected successfully!');
}