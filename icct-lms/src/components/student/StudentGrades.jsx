import { useContext } from 'react';
import StudentNavbarComponent from './StudentNavbarComponent';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContextVariable } from '../../context/context-config';

const StudentGrades = () => {
	const { id } = useParams();
	const { scoreData, userID } = useContext(ContextVariable);

	const studentGrades = scoreData.filter(
		(item) => item.subjectID === id && item.studentID === userID
	);

	return (
		<>
			<StudentNavbarComponent />
			<Container>
				<>
					{studentGrades.length === 0 ? (
						<div className=" mt-5">
							<h4 className="pt-5 text-center">
								You don't have any grades yet
							</h4>
						</div>
					) : (
						studentGrades.map((item) => {
							return (
								<div
									key={item.scoreID}
									className="d-flex justify-content-around my-3"
								>
									<p>{item.studentName}</p>
									<b>{item.score}</b>
								</div>
							);
						})
					)}
				</>
			</Container>
		</>
	);
};

export default StudentGrades;
