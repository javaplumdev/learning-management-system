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
	const {
		activitiesData,
		subjectData,
		userID,
		filteredActivities,
		setFilteredActivities,
		activityIDToRemove,
		setActivityIDToRemove,
	} = useContext(ContextVariable);

	const sample = subjectData.map((item) => item.studentsEnrolled);

	const studentFeed = [];
	const studentActivities = [];

	sample.forEach((item) => {
		item.map((sub) => {
			if (sub.studentID === userID) {
				studentFeed.push(sub);
			}
		});
	});

	studentFeed.map((item) => {
		filteredActivities.map((act) => {
			if (item.subjectEnrolled === act.subjectID) {
				studentActivities.push(act);
			}
		});
	});

	useEffect(() => {
		setFilteredActivities(
			activitiesData.filter((item) => item.quizID !== activityIDToRemove)
		);
	}, []);

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
							{filteredActivities.map((item) => {
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
