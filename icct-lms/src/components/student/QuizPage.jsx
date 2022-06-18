import { useContext, useState, useEffect } from 'react';
import { ContextVariable } from '../../context/context-config';
import { useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import StudentNavbarComponent from './StudentNavbarComponent';
import { updateDoc, arrayUnion, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const QuizPage = () => {
	const {
		activitiesData,
		activityData,
		setActivityData,
		currentQuiz,
		score,
		answer,
		setAnswer,
		setCurrentQuiz,
		userID,
		user,
		subjectData,
		setScore,
		subjectID,
	} = useContext(ContextVariable);
	const { id } = useParams();

	const activityToTake = activitiesData.filter((item) => item.quizID === id);
	const subjectIDFinal = subjectData.filter(
		(item) => item.subjectID === subjectID
	);

	const subjectIDToTake = subjectIDFinal.map((item) => item.subjectID)[0];

	useEffect(() => {
		activityToTake.map((item) => {
			setActivityData(item.quiz);
		});
	}, [activityToTake]);

	const question = activityData[currentQuiz]?.question;
	const quizLength = activityData.length - 1;
	const a = activityData[currentQuiz]?.a;
	const b = activityData[currentQuiz]?.b;
	const c = activityData[currentQuiz]?.c;
	const d = activityData[currentQuiz]?.d;
	const correctAnswer = activityData[currentQuiz]?.correctAnswer;

	const handleChange = (e) => {
		setAnswer(e.target.value);
	};

	const submitQuestion = (id, userID, correctAnswer, userEmail) => {
		if (currentQuiz < activityData.length) {
			setCurrentQuiz((prevState) => prevState + 1);
			if (answer === correctAnswer) {
				setScore((prevState) => prevState + 1);
			}
		}

		if (currentQuiz === activityData.length - 1) {
			setDoc(doc(db, 'score', id), {
				actID: id,
				studentID: userID,
				studentName: userEmail,
				score: score + 1,
				subjectID: subjectIDToTake,
			});
		}
	};

	return (
		<>
			<StudentNavbarComponent />
			<div
				className="px-4 d-flex justify-content-center align-items-center"
				style={{ height: '70vh' }}
			>
				<Container
					className=" border rounded my-5 "
					style={{ maxWidth: '520px' }}
				>
					{currentQuiz === activityData.length ? (
						<div className="p-3 text-center">
							<h3>
								YOUR GRADE IS {score} / {activityData.length}
							</h3>
							<Link to="/StudentHomePage">
								<Button>Go back</Button>
							</Link>
						</div>
					) : (
						<>
							<div className="p-3 ">
								<h4>{question}</h4>
								<div className="form-check">
									<input
										className="form-check-input"
										type="radio"
										name="flexRadioDefault"
										id="flexRadioDefault1"
										value="a"
										checked={answer === 'a'}
										onChange={handleChange}
									/>
									<label
										className="form-check-label"
										htmlFor="flexRadioDefault1"
									>
										{a}
									</label>
								</div>
								<div className="form-check">
									<input
										className="form-check-input"
										type="radio"
										name="flexRadioDefault"
										id="flexRadioDefault2"
										value="b"
										checked={answer === 'b'}
										onChange={handleChange}
									/>
									<label
										className="form-check-label"
										htmlFor="flexRadioDefault2"
									>
										{b}
									</label>
								</div>
								<div className="form-check">
									<input
										className="form-check-input"
										type="radio"
										name="flexRadioDefault"
										id="flexRadioDefault3"
										value="c"
										checked={answer === 'c'}
										onChange={handleChange}
									/>
									<label
										className="form-check-label"
										htmlFor="flexRadioDefault3"
									>
										{c}
									</label>
								</div>
								<div className="form-check">
									<input
										className="form-check-input"
										type="radio"
										name="flexRadioDefault"
										id="flexRadioDefault4"
										value="d"
										checked={answer === 'd'}
										onChange={handleChange}
									/>
									<label
										className="form-check-label"
										htmlFor="flexRadioDefault4"
									>
										{d}
									</label>
								</div>
							</div>
							<Button
								className="w-100 mb-3"
								onClick={() =>
									submitQuestion(id, userID, correctAnswer, user.email)
								}
							>
								Submit
							</Button>
						</>
					)}
				</Container>
			</div>
		</>
	);
};

export default QuizPage;
