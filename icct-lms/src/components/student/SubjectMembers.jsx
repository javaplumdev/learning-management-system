import StudentNavbarComponent from './StudentNavbarComponent';
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContextVariable } from '../../context/context-config';

const SubjectMembers = () => {
	const { id } = useParams();

	const { subjectData } = useContext(ContextVariable);

	const filteredSub = subjectData.filter((item) => item.subjectID === id);

	const subjectName = filteredSub.map((item) => item.subjectName)[0];
	const studentsEnrolled = filteredSub.map((item) => item.studentsEnrolled)[0];

	console.log(subjectName);
	console.log(studentsEnrolled);

	return (
		<div>
			<StudentNavbarComponent />
			<Container>
				<div className="border rounded p-3 mt-5">
					<h1>{subjectName}</h1>
					<p className="lead">Students Enrolled</p>
				</div>
				<div>
					{studentsEnrolled.map((item) => {
						return (
							<div
								key={item.studentID}
								className="border rounded p-3 my-3 d-flex justify-content-between"
							>
								<p>{item.studentName}</p>
								<p>{item.studentID}</p>
							</div>
						);
					})}
				</div>
			</Container>
		</div>
	);
};

export default SubjectMembers;
