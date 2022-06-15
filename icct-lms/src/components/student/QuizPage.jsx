import { useContext } from 'react';
import { ContextVariable } from '../../context/context-config';
import { useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import StudentNavbarComponent from './StudentNavbarComponent';

const QuizPage = () => {
	const { activitiesData } = useContext(ContextVariable);
	const { id } = useParams();

	const activityToTake = activitiesData.filter((item) => item.quizID === id);

	const sample = activityToTake.map((item) => item.quiz)[0];
	console.log(sample);

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
					<div className="p-3 ">
						<h4>Question</h4>
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault1"
							/>
							<label className="form-check-label" htmlFor="flexRadioDefault1">
								Default radio
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault2"
							/>
							<label className="form-check-label" htmlFor="flexRadioDefault2">
								Default checked radio
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault3"
							/>
							<label className="form-check-label" htmlFor="flexRadioDefault3">
								Default checked radio
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault4"
							/>
							<label className="form-check-label" htmlFor="flexRadioDefault4">
								Default checked radio
							</label>
						</div>
					</div>
					<Button className="w-100 mb-3">Submit</Button>
				</Container>
			</div>
		</>
	);
};

export default QuizPage;
