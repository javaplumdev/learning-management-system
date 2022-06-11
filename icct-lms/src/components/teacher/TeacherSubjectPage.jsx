// React
import { useContext } from 'react';
// Components
import NavbarComponent from './NavbarComponent';
// Bootsrtap
import { Container, Button, Row, Col, Modal, Form } from 'react-bootstrap';
// React DOM
import { useParams, Link } from 'react-router-dom';
import { ContextVariable } from '../../context/context-config';
// UUID
import { v4 as uuidv4 } from 'uuid';

const TeacherSubjectPage = () => {
	const { id } = useParams();
	const { subjectData } = useContext(ContextVariable);

	const { show, handleClose, handleShow, setQuizName, setQuizDescription } =
		useContext(ContextVariable);

	const { createActivities, addQuestion } = useContext(ContextVariable);

	const subject = subjectData.filter((sub) => sub.subjectID === id);

	const activityID = uuidv4();

	return (
		<>
			<NavbarComponent />
			<Container>
				{subject.map((item) => {
					return (
						<div
							key={item.subjectID}
							className="mt-4 border rounded p-4 d-flex flex-wrap justify-content-between align-items-center"
						>
							<p className="display-6 fw-bold">{item.subjectName}</p>
							<div>
								<Button variant="outline-primary" className="m-2">
									Post
								</Button>

								<Button onClick={handleShow}>Add activities</Button>
								{/* Modal */}
								<Modal show={show} onHide={handleClose}>
									<Modal.Header closeButton>
										<Modal.Title>Modal heading</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<Form.Group className="mb-3">
											<Form.Control
												type="text"
												placeholder="Quiz name"
												onChange={(e) => setQuizName(e.target.value)}
											/>
										</Form.Group>
										<Form.Group className="my-3">
											<Form.Control
												type="text"
												placeholder="Quiz description"
												onChange={(e) => setQuizDescription(e.target.value)}
											/>
										</Form.Group>
									</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={handleClose}>
											Close
										</Button>
										<Link
											to={`/createquiz/${item.subjectName}/${item.subjectID}`}
										>
											<Button onClick={() => createActivities(id, activityID)}>
												Create activities
											</Button>
										</Link>
									</Modal.Footer>
								</Modal>
							</div>
						</div>
					);
				})}

				<div className="mt-2">
					<Row>
						<Col md="3" className="mt-3">
							<div className="bg-primary rounded p-3 text-white">
								<p>Activities</p>
								<p>Students</p>
								<p>Grades</p>
							</div>
						</Col>
						<Col md="9" className="mt-3">
							<div className="border p-3 rounded">
								<div className="d-flex justify-content-between align-items-center">
									<b>Activity name</b>
									<Button>See quiz</Button>
								</div>
								<div className="mt-3">
									<p>Quiz description</p>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</Container>
		</>
	);
};

export default TeacherSubjectPage;
