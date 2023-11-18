// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId,
	measurementId: process.env.measurementId
};

export const fb = initializeApp(firebaseConfig);
export const db = initializeFirestore(fb, {})
if (db instanceof Error) {
	console.error('Error connecting to Firestore:', db.message);
} else {
	console.log('Firestore connected successfully!');
}