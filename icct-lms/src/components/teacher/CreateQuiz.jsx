// React
import { useContext, useState } from 'react';
// Components
import NavbarComponent from './NavbarComponent';
// React bootsrtap
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// React DOM
import { useParams, Link } from 'react-router-dom';
import { ContextVariable } from '../../context/context-config';

const CreateQuiz = () => {
	const { id } = useParams();
	const { subjectData, addActivities } = useContext(ContextVariable);

	const [quizDetails, setQuizDetails] = useState({
		quizName: '',
		quizDesription: '',
		a: '',
		b: '',
		c: '',
		d: '',
		correctAnswer: '',
	});

	return (
		<>
			<NavbarComponent />
			<Container>
				<div className="mt-4 border rounded p-4 d-flex flex-wrap justify-content-between align-items-center">
					<p className="display-6 fw-bold">Create Quiz</p>
				</div>

				<div className="mt-2">
					<Row>
						<Col md="3" className="mt-3">
							<div className="border rounded p-3 ">
								<p>Quiz details</p>
								<Button variant="outline-primary" className="me-3">
									Add
								</Button>
								<Button onClick={() => addActivities(id)}>Submit</Button>
							</div>
						</Col>
						<Col md="9" className="mt-3">
							<Form.Group className="mb-3">
								<Form.Label>Quiz name</Form.Label>
								<Form.Control
									type="email"
									placeholder="Quiz name"
									onChange={(e) =>
										setQuizDetails((prevState) => {
											return {
												...prevState,
												quizName: e.target.value,
											};
										})
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Quiz description</Form.Label>
								<Form.Control type="text" placeholder="Quiz description" />
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Answers</Form.Label>
								<Form.Control
									type="text"
									placeholder="A"
									onChange={(e) =>
										setQuizDetails((prevState) => {
											return {
												...prevState,
												a: e.target.value,
											};
										})
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Control
									type="text"
									placeholder="B"
									onChange={(e) =>
										setQuizDetails((prevState) => {
											return {
												...prevState,
												b: e.target.value,
											};
										})
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Control
									type="text"
									text="C"
									onChange={(e) =>
										setQuizDetails((prevState) => {
											return {
												...prevState,
												c: e.target.value,
											};
										})
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Control
									type="text"
									placeholder="D"
									onChange={(e) =>
										setQuizDetails((prevState) => {
											return {
												...prevState,
												d: e.target.value,
											};
										})
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Correct Answer</Form.Label>
								<Form.Control
									type="text"
									placeholder="Correct Answer"
									onChange={(e) =>
										setQuizDetails((prevState) => {
											return {
												...prevState,
												correctAnswer: e.target.value,
											};
										})
									}
								/>
							</Form.Group>
						</Col>
					</Row>
				</div>
			</Container>
		</>
	);
};

export default CreateQuiz;
