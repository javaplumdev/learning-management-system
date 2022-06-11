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
import {
	setDoc,
	doc,
	getDocs,
	collection,
	addDoc,
	onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
// UUID
import { v4 as uuidv4 } from 'uuid';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [userDetails, setUserDetails] = useState({});
	const [userData, setUserData] = useState([]);
	const [userID, setUserID] = useState('');
	const [subjectData, setSubjectData] = useState([]);

	// For opening a modal
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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

	const subjectCollectionRef = collection(db, 'subjects');

	const addSubject = async (subjectName, subjectCode) => {
		await addDoc(subjectCollectionRef, {
			subjectID: uuidv4(),
			owner: userID,
			subjectName: subjectName,
			subjectCode: subjectCode,
		});

		handleClose();
	};

	useEffect(() => {
		const getSubjectData = async () => {
			const data = await getDocs(subjectCollectionRef);

			setSubjectData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		return () => {
			getSubjectData();
		};
	}, []);

	useEffect(() => {
		onSnapshot(collection(db, 'subjects'), (snapShot) => {
			setSubjectData(
				snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});
	}, []);

	return (
		<ContextVariable.Provider
			value={{
				logOut,
				signUp,
				signIn,
				user,
				isLoggedIn,
				userData,
				userID,
				addSubject,
				setShow,
				show,
				handleClose,
				handleShow,
				subjectData,
			}}
		>
			{children}
		</ContextVariable.Provider>
	);
};
