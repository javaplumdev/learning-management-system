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
	arrayUnion,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
// UUID
import { v4 as uuidv4 } from 'uuid';
import { async } from '@firebase/util';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [userDetails, setUserDetails] = useState({});
	const [userData, setUserData] = useState([]);
	const [userID, setUserID] = useState('');
	const [subjectData, setSubjectData] = useState([]);
	const [quizName, setQuizName] = useState('');
	const [quizDescription, setQuizDescription] = useState('');
	const [activitiesData, setActivitiesData] = useState([]);

	// For opening a modal
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const signUp = async (email, password, userType) => {
		onAuthStateChanged(firebaseAuth, (currentUser) => {
			try {
				setDoc(doc(db, 'users', currentUser.uid), {
					id: currentUser.uid,
					email: email,
					password: password,
					userType: userType,
				});
			} catch (e) {
				console.warn(e.message);
			}
		});

		return createUserWithEmailAndPassword(firebaseAuth, email, password);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
			if (currentUser === null) {
				return true;
			} else {
				setUser(currentUser);
				// connectUID(currentUser.uid, currentUser.email);
				setUserID(currentUser.uid);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const signIn = (email, password) => {
		setIsLoggedIn(true);

		return signInWithEmailAndPassword(firebaseAuth, email, password);
	};

	const logOut = () => {
		setIsLoggedIn(false);

		return signOut(firebaseAuth);
	};

	useEffect(() => {
		onSnapshot(collection(db, 'users'), (snapShot) => {
			setUserData(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});
	}, []);

	const subjectCollectionRef = collection(db, 'subjects');

	const addSubject = async (subjectName, subjectCode, subjectID) => {
		await setDoc(doc(db, 'subjects', subjectID), {
			subjectID: subjectID,
			owner: userID,
			subjectName: subjectName,
			subjectCode: subjectCode,
		});

		handleClose();
	};

	useEffect(() => {
		onSnapshot(collection(db, 'subjects'), (snapShot) => {
			setSubjectData(
				snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});
	}, []);

	useEffect(() => {
		onSnapshot(collection(db, 'activities'), (snapShot) => {
			setActivitiesData(
				snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});
	}, []);

	const [activityID, setActivityID] = useState('');

	const createActivities = async (id, activityID) => {
		setActivityID(activityID);
		await setDoc(doc(db, 'activities', activityID), {
			quizID: activityID,
			subjectID: id,
			ownerID: userID,
			quizName: quizName,
			quizDescription: quizDescription,
			quiz: [],
		});

		await updateDoc();
	};

	const [question, setQuestion] = useState('');
	const [aState, setAState] = useState('');
	const [bState, setBState] = useState('');
	const [cState, setCState] = useState('');
	const [dState, setDState] = useState('');
	const [correctAnswer, setCorrectAnswer] = useState('');

	const addActivities = async () => {
		const activityRef = doc(db, 'activities', activityID);
		await updateDoc(activityRef, {
			quiz: arrayUnion({
				question: question,
				a: aState,
				b: bState,
				c: cState,
				d: dState,
				correctAnswer: correctAnswer,
			}),
		});

		setQuestion('');
		setAState('');
		setBState('');
		setCState('');
		setDState('');
		setCorrectAnswer('');
	};

	const enrollSubject = (code, studentID, studentName) => {
		subjectData.map((item) => {
			if (code === item.subjectCode) {
				updateDoc(doc(db, 'subjects', item.subjectID), {
					studentsEnrolled: arrayUnion({
						studentID: studentID,
						studentName: studentName,
					}),
				});
			} else {
				console.warn('Wrong code');
			}
		});

		handleClose();
	};

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
				createActivities,
				setQuizDescription,
				setQuizName,
				addActivities,
				setQuestion,
				setAState,
				setBState,
				setCState,
				setDState,
				setCorrectAnswer,
				question,
				aState,
				bState,
				cState,
				dState,
				correctAnswer,
				activitiesData,
				enrollSubject,
			}}
		>
			{children}
		</ContextVariable.Provider>
	);
};
