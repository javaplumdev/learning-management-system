import { useContext } from 'react';
import { ContextVariable } from '../../context/context-config';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
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
			<Container>
				<p>Quiz</p>
			</Container>
		</>
	);
};

export default QuizPage;
