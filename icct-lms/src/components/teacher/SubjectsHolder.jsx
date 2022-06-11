// React
import { useContext, useState } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
// Context
import { ContextVariable } from '../../context/context-config';

const SubjectsHolder = () => {
	const {
		logOut,
		user,
		userData,
		userID,
		addSubject,
		setShow,
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
								{/* <div className="d-flex justify-content-center align-items-center my-3">
									<h4 className=" rounded w-100 me-3">Subject Code</h4>
									<Button variant="outline-primary">Generate</Button>
								</div> */}
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
							<div key={item.subjectID} className="my-3">
								<div className="p-3 border rounded">
									<p>{item.subjectName}</p>
									<div className="d-flex">
										<p className="me-3">0 Student</p>
										<p>0 Activities</p>
									</div>
								</div>
							</div>
						);
					}
				})}
			</Container>
		</>
	);
};

export default SubjectsHolder;
