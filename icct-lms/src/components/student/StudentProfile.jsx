import { useContext } from 'react';
// Component
import StudentNavbarComponent from './StudentNavbarComponent';
// Context
import { ContextVariable } from '../../context/context-config';
// React Bootstrsap
import { Container } from 'react-bootstrap';

const StudentProfile = () => {
	const { user } = useContext(ContextVariable);

	return (
		<>
			<StudentNavbarComponent />
			<Container>
				<div className="p-4 box mt-3">
					Hello Welcome <br />
					<p>{user.email}</p>
				</div>
			</Container>
		</>
	);
};

export default StudentProfile;
