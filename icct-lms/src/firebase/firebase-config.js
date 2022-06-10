// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCoo5yCcLwWE4APjYnQq3WmrygyhCgaG2A',
	authDomain: 'icct-lms-d79f2.firebaseapp.com',
	projectId: 'icct-lms-d79f2',
	storageBucket: 'icct-lms-d79f2.appspot.com',
	messagingSenderId: '69195696472',
	appId: '1:69195696472:web:398359acc18fab7d403d2d',
	measurementId: 'G-3VMTN7447R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
