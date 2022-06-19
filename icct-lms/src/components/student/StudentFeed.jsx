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
		userID,
		subjectData,
		setSubjectID,
		subjectID,
		scoreData,
	} = useContext(ContextVariable);

	let studentFeed = activitiesData;

	scoreData.map((item) => {
		if (item.studentID === userID) {
			if (item.isTaken === true) {
				const index = studentFeed.findIndex((object) => {
					return object.quizID === item.actID;
				});

				if (index > -1) {
					studentFeed.splice(index, 1); // 2nd parameter means remove one item only
				}
			}
		}
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
							{studentFeed.map((item) => {
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
