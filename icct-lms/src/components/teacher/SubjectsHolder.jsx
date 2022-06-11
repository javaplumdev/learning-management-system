// React
import { useContext, useState } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
// Context
import { ContextVariable } from '../../context/context-config';
// React router DOM
import { Link } from 'react-router-dom';

const SubjectsHolder = () => {
	const {
		user,
		userData,
		userID,
		addSubject,
		show,
		handleClose,
		handleShow,
		subjectData,
	} = useContext(ContextVariable);

	const [subjectName, setSubjectName] = useState('');
	const [subjectCode, setSubjectCode] = useState('');

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
								onClick={() => addSubject(subjectName, subjectCode)}
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
											<p className="me-3">0 Student</p>
											<p>0 Activities</p>
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
