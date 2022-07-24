// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
	apiKey: 'AIzaSyAHzUtTeLIYadlzt_C3qnFFY1tI2l5eGLk',
	authDomain: 'admin-panel-b69c7.firebaseapp.com',
	projectId: 'admin-panel-b69c7',
	storageBucket: 'admin-panel-b69c7.appspot.com',
	messagingSenderId: '549097387965',
	appId: '1:549097387965:web:29b7e11945662623cc84d4',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


const auth = getAuth();
