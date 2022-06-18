import NavbarComponent from './NavbarComponent';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContextVariable } from '../../context/context-config';
import { useContext } from 'react';

const StudentRecord = () => {
	const { id } = useParams();

	const { subjectData, activitiesData } = useContext(ContextVariable);

	console.log(subjectData);
	console.log(activitiesData);

	return (
		<>
			<NavbarComponent />
			<Container>
				<p>Student Record</p>
			</Container>
		</>
	);
};

export default StudentRecord;
