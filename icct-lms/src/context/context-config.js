// React
import { createContext, useEffect, useState } from 'react';
// Firebase
import { firebaseAuth } from '../firebase/firebase-config';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const [user, setUser] = useState({});

	const signUp = (email, password, userType) => {
		return createUserWithEmailAndPassword(firebaseAuth, email, password);
	};

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(firebaseAuth, email, password);
	};

	const logOut = () => {
		return signOut(firebaseAuth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (currentuser) => {
			setUser(currentuser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<ContextVariable.Provider value={{ logOut, signUp, signIn, user }}>
			{children}
		</ContextVariable.Provider>
	);
};
