// React
import React, { useContext, useEffect, useState } from 'react';
// Component
import StudentSidebar from './StudentSidebar';
// React bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';
// Context
import { ContextVariable } from '../../context/context-config';
// React DOM
import { Link } from 'react-router-dom';

const StudentFeed = () => {
	const { activitiesData, userID, subjectData, setSubjectID, subjectID } =
		useContext(ContextVariable);

	const [filteredActivity, setFilteredActivity] = useState([]);

	const sample = subjectData.map((item) => item.studentsEnrolled);
	const studentFeed = [];
	let newArray = [];
	sample.forEach((item) => {
		item.map((sub) => {
			if (sub.studentID === userID) {
				studentFeed.push(sub);
			}
		});
	});

	studentFeed.map((sub) => {
		activitiesData.map((act) => {
			if (sub.subjectEnrolled === act.subjectID) {
				newArray.push(act);
			}
		});
	});

	newArray.map((item) => {
		item.score.map((score) => {
			if (score.studentID === userID && score.isTaken === true) {
				const index = newArray.findIndex((object) => {
					return object.id === score.actID;
				});

				newArray.splice(index);
			}
		});
	});

	return (
		<div className="mt-5">
			<Container>
				<Row>
					<Col md="3">
						<StudentSidebar />
					</Col>
					<Col md="9">
						<div className=" rounded ">
							<p>Activities</p>
							{newArray.map((item) => {
								setSubjectID(item.subjectID);

								return (
									<div key={item.id} className="border my-3 p-3">
										<div className="d-flex justify-content-between align-items-center">
											<h3>{item.subjectName}</h3>
											<Link to={`/quizpage/${item.quizID}`}>
												<Button>Take quiz</Button>
											</Link>
										</div>
										<small>
											<b>{item.quizName}</b>
											<br></br>
											{item.quiz.length >= 0 && item.quiz.length <= 1
												? `${item.quiz.length} item`
												: `${item.quiz.length} items`}
											<br></br>
											{item.quizDescription}
										</small>
									</div>
								);
							})}
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default StudentFeed;
