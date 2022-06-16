import { useContext, useState, useEffect } from 'react';
import { ContextVariable } from '../../context/context-config';
import { useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import StudentNavbarComponent from './StudentNavbarComponent';

const QuizPage = () => {
	const {
		activitiesData,
		activityData,
		setActivityData,
		currentQuiz,
		score,
		answer,
		setAnswer,
		submitQuestion,
		userID,
		user,
	} = useContext(ContextVariable);
	const { id } = useParams();

	const activityToTake = activitiesData.filter((item) => item.quizID === id);

	useEffect(() => {
		activityToTake.map((item) => {
			setActivityData(item.quiz);
		});
	}, [activityToTake]);

	const question = activityData[currentQuiz]?.question;

	const a = activityData[currentQuiz]?.a;
	const b = activityData[currentQuiz]?.b;
	const c = activityData[currentQuiz]?.c;
	const d = activityData[currentQuiz]?.d;
	const correctAnswer = activityData[currentQuiz]?.correctAnswer;

	const handleChange = (e) => {
		setAnswer(e.target.value);
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
							<Button>Go back</Button>
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
									submitQuestion(id, score, userID, correctAnswer, user.email)
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
