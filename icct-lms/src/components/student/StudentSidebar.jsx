import { useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ContextVariable } from '../../context/context-config';

const StudentSidebar = () => {
	const { show, handleClose, handleShow } = useContext(ContextVariable);

	return (
		<>
			<div className="border rounded p-3 ">
				<p>Subjects Enrollment</p>
				<Button onClick={handleShow}>Enroll a subject</Button>

				{/* Modal */}
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Enroll subject</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group className="mb-3">
							<Form.Control type="text" placeholder="Subject code" />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="outline-secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary">Enroll</Button>
					</Modal.Footer>
				</Modal>

				{/* Modal */}
				<hr></hr>
				<p>My classes</p>
			</div>
		</>
	);
};

export default StudentSidebar;
