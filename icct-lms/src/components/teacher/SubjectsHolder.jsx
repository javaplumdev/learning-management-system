// React
import { useContext, useState } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
// Context
import { ContextVariable } from '../../context/context-config';
// React router DOM
import { Link } from 'react-router-dom';
// UUID
import { v4 as uuidv4 } from 'uuid';

const SubjectsHolder = () => {
	const {
		userID,
		addSubject,
		show,
		handleClose,
		handleShow,
		subjectData,
		activitiesData,
	} = useContext(ContextVariable);

	const [subjectName, setSubjectName] = useState('');
	const [subjectCode, setSubjectCode] = useState('');

	const subjectLength = [];

	const subjectID = uuidv4();

	return (
		<>
			<Container>
				<div className="header mt-4 d-flex justify-content-between align-items-center">
					<h5 className="fw-bold">Your class</h5>
					<Button onClick={handleShow}>Add class</Button>

					{/* Modal */}
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Modal heading</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group className="mb-3">
								<Form.Control
									type="text"
									placeholder="Subject name"
									onChange={(e) => setSubjectName(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className="my-3">
								<Form.Control
									type="text"
									placeholder="Subject code"
									onChange={(e) => setSubjectCode(e.target.value)}
								/>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button
								variant="primary"
								onClick={() => addSubject(subjectName, subjectCode, subjectID)}
							>
								Add subject
							</Button>
						</Modal.Footer>
					</Modal>
				</div>

				{subjectData.map((item) => {
					if (userID === item.owner) {
						return (
							<Link
								key={item.subjectID}
								to={`/teacherspage/${item.subjectName}/${item.subjectID}`}
								className="text-decoration-none"
							>
								<div className="my-3  text-dark">
									<div className="p-3 border rounded">
										<p>{item.subjectName}</p>
										<div className="d-flex">
											<p className="me-3">
												{item.studentsEnrolled.length >= 0 &&
												item.studentsEnrolled.length <= 1
													? `${item.studentsEnrolled.length} student`
													: `${item.studentsEnrolled.length} students`}
											</p>

											{activitiesData.map((act) => {
												if (act.subjectID === item.subjectID) {
													subjectLength.push(act);
												}
											})}
											<p>
												{subjectLength.filter(
													(sub) => sub.subjectID === item.subjectID
												).length >= 0 &&
												subjectLength.filter(
													(sub) => sub.subjectID === item.subjectID
												).length <= 1
													? `${
															subjectLength.filter(
																(sub) => sub.subjectID === item.subjectID
															).length
													  } activity`
													: `${
															subjectLength.filter(
																(sub) => sub.subjectID === item.subjectID
															).length
													  } activities`}
											</p>
										</div>
									</div>
								</div>
							</Link>
						);
					}
				})}
			</Container>
		</>
	);
};

export default SubjectsHolder;
