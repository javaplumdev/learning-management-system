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
	const [userDetails, setUserDetails] = useState({});
	const [user, setUser] = useState({});

	const signUp = (email, password, userType) => {
		setUserDetails({
			email: email,
			passowrd: password,
			userType: userType,
		});

		return createUserWithEmailAndPassword(firebaseAuth, email, password);
	};

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(firebaseAuth, email, password);
	};

	const logOut = () => {
		return signOut(firebaseAuth);
	};

	useEffect(() => {
		const onMountChange = onAuthStateChanged(firebaseAuth, (currentUser) => {
			if (currentUser === null) {
				return true;
			} else {
				setUser(currentUser);
			}
		});

		return () => {
			onMountChange();
		};
	}, []);

	return (
		<ContextVariable.Provider value={{ logOut, signUp, signIn, user }}>
			{children}
		</ContextVariable.Provider>
	);
};
