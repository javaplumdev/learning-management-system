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
import { setDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [userDetails, setUserDetails] = useState({});
	const [userData, setUserData] = useState([]);
	const [userID, setUserID] = useState('');

	const signUp = (email, password, userType) => {
		setUserDetails({
			email: email,
			password: password,
			userType: userType,
		});

		return createUserWithEmailAndPassword(firebaseAuth, email, password);
	};

	const signIn = (email, password) => {
		setIsLoggedIn(true);

		return signInWithEmailAndPassword(firebaseAuth, email, password);
	};

	const logOut = () => {
		setIsLoggedIn(false);

		return signOut(firebaseAuth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
			if (currentUser === null) {
				return true;
			} else {
				setUser(currentUser);
				connectUID(currentUser.uid, currentUser.email);
				setUserID(currentUser.uid);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	// Is logged in
	// useEffect(() => {
	// 	localStorage.setItem('isLoggedIn', isLoggedIn);
	// });

	const connectUID = async (uid, email) => {
		if (
			userDetails.password === undefined &&
			userDetails.userType === undefined
		) {
		} else {
			await setDoc(doc(db, 'users', uid), {
				id: uid,
				email: email,
				password: userDetails.password,
				userType: userDetails.userType,
			});
		}
	};

	const usersCollectionRef = collection(db, 'users');

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(usersCollectionRef);

			setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		getUsers();
	}, []);

	return (
		<ContextVariable.Provider
			value={{ logOut, signUp, signIn, user, isLoggedIn, userData, userID }}
		>
			{children}
		</ContextVariable.Provider>
	);
};
