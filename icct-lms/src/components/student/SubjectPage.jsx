import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ContextVariable } from '../../context/context-config';
import { Container, Button } from 'react-bootstrap';
import StudentNavbarComponent from './StudentNavbarComponent';
import { Row, Col } from 'react-bootstrap';

const SubjectPage = () => {
	const { subjectData, activitiesData } = useContext(ContextVariable);
	const { id } = useParams();
	const activities = activitiesData.filter((act) => act.subjectID === id);
	return (
		<>
			<StudentNavbarComponent />
			<Container>
				{subjectData.map((item) => {
					if (id === item.subjectID) {
						return (
							<div key={item.subjectID} className="border p-3 my-3 rounded">
								<h2>{item.subjectName}</h2>
							</div>
						);
					}
				})}
				<Row>
					<Col md="3">
						<div className="bg-primary text-white p-3 rounded">
							<Link
								to={`/studentannouncement/${id}`}
								className="text-white text-decoration-none"
							>
								Announcement
							</Link>
							<br></br>
							<Link
								to={`/studentgrades/${id}`}
								className="text-white text-decoration-none"
							>
								Your grade
							</Link>

							<p>Members</p>
						</div>
					</Col>
					<Col md="9">
						{activities.length === 0 ? (
							<div
								className="justify-content-center align-items-center d-flex"
								style={{ height: '100px' }}
							>
								<h4>No activities yet</h4>
							</div>
						) : (
							activities.map((item) => {
								return (
									<div key={item.quizID} className="border p-3 rounded mb-3">
										<div className="d-flex justify-content-between align-items-center">
											<b>{item.quizName}</b>

											<Button>Take quiz</Button>
										</div>
										<div className="mt-3">
											<p>{item.quizDescription}</p>
										</div>
									</div>
								);
							})
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default SubjectPage;
