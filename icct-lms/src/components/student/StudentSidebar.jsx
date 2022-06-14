import { useContext, useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ContextVariable } from '../../context/context-config';

const StudentSidebar = () => {
	const {
		show,
		handleClose,
		handleShow,
		enrollSubject,
		userData,
		userID,
		subjectData,
		myClasses,
		setMyClasses,
	} = useContext(ContextVariable);

	const studentFeed = [];

	const [subjectCode, setSubjectCode] = useState('');

	const studentData = userData.filter((item) => userID === item.id);
	const studentName = studentData.map((item) => item.email)[0];
	const studentID = studentData.map((item) => item.id)[0];

	const sample = subjectData.map((item) => item.studentsEnrolled);

	sample.forEach((item) => {
		item.map((sub) => {
			if (sub.studentID === userID) {
				studentFeed.push(sub);
				console.log(studentFeed);
			}
		});
	});

	return (
		<>
			<div className="border rounded p-3 mb-3">
				<p>Subjects Enrollment</p>
				<Button onClick={handleShow}>Enroll a subject</Button>

				{/* Modal */}
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Enroll subject</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group className="mb-3">
							<Form.Control
								type="text"
								placeholder="Subject code"
								onChange={(e) => setSubjectCode(e.target.value)}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="outline-secondary" onClick={handleClose}>
							Close
						</Button>
						<Button
							variant="primary"
							onClick={() => enrollSubject(subjectCode, studentID, studentName)}
						>
							Enroll
						</Button>
					</Modal.Footer>
				</Modal>

				{/* Modal */}
				<hr></hr>
				<p>My classes</p>
				{studentFeed.map((item) => {
					return (
						<div key={item.subjectEnrolled}>
							<b>{item.subjectName}</b>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default StudentSidebar;
