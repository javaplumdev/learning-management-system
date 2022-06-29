// React
import { useContext, useState } from 'react';
// Components
import NavbarComponent from './NavbarComponent';
// Bootsrtap
import {
	Container,
	Button,
	Row,
	Col,
	Modal,
	Form,
	FloatingLabel,
} from 'react-bootstrap';
// React DOM
import { useParams, Link } from 'react-router-dom';
import { ContextVariable } from '../../context/context-config';
// UUID
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

const TeacherSubjectPage = () => {
	const { id } = useParams();
	const { subjectData } = useContext(ContextVariable);

	const {
		setShow,
		show,
		handleClose,
		handleShow,
		setQuizName,
		setQuizDescription,
		activitiesData,
		createActivities,
		userID,
		user,
		postContent,
		postShow,
		setPostShow,
	} = useContext(ContextVariable);

	const [postUserContent, setPostUserContent] = useState('');
	const subject = subjectData.filter((sub) => sub.subjectID === id);
	const activityID = uuidv4();
	const postID = uuidv4();

	const activities = activitiesData.filter((act) => act.subjectID === id);

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
								<Button
									variant="outline-primary"
									className="m-2"
									onClick={() => setPostShow(true)}
								>
									Post
								</Button>

								<Modal show={postShow} onHide={() => setPostShow(false)}>
									<Modal.Header closeButton>
										<Modal.Title>Post</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<FloatingLabel
											controlId="floatingTextarea"
											label="Comments"
											className="mb-3"
										>
											<Form.Control
												style={{ resize: 'none', height: '200px' }}
												as="textarea"
												placeholder="Leave a comment here"
												onChange={(e) => setPostUserContent(e.target.value)}
											/>
										</FloatingLabel>
									</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={handleClose}>
											Close
										</Button>
										<Button
											onClick={() =>
												postContent(
													postID,
													postUserContent,
													user.email,
													userID,
													id
												)
											}
										>
											Post
										</Button>
									</Modal.Footer>
								</Modal>

								<Button onClick={handleShow}>Add activities</Button>
								{/* Modal */}
								<Modal show={show} onHide={handleClose}>
									<Modal.Header closeButton>
										<Modal.Title>Add activities</Modal.Title>
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
											<Button
												onClick={() =>
													createActivities(id, activityID, item.subjectName)
												}
											>
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

								<Link
									to={`/studentrecord/${id}`}
									className="text-white text-decoration-none "
								>
									Student grades
								</Link>
								<br></br>
								<Link
									to={`/students-enrolled/${id}`}
									className="text-white text-decoration-none "
								>
									Student enrolled
								</Link>
								<br></br>
								<Link
									to={`/announcementpage/${id}`}
									className="text-white text-decoration-none"
								>
									Announcement
								</Link>
							</div>
						</Col>
						<Col md="9" className="mt-3">
							{activities.map((item) => {
								return (
									<div key={item.quizID} className="border p-3 rounded mb-3">
										<div className="d-flex justify-content-between align-items-center">
											<b>{item.quizName}</b>
											<Button>See quiz</Button>
										</div>
										<div className="mt-3">
											<p>{item.quizDescription}</p>
										</div>
									</div>
								);
							})}
						</Col>
					</Row>
				</div>
			</Container>
		</>
	);
};

export default TeacherSubjectPage;
