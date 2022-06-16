// React
import { useContext, useState } from 'react';
// Components
import NavbarComponent from './NavbarComponent';
// React bootsrtap
import { Container, Row, Col, Button, Form, Dropdown } from 'react-bootstrap';
// React DOM
import { useParams, Link } from 'react-router-dom';
import { ContextVariable } from '../../context/context-config';

const CreateQuiz = () => {
	const { id } = useParams();

	const {
		addActivities,
		setQuestion,
		setAState,
		setBState,
		setCState,
		setDState,
		setCorrectAnswer,
		question,
		aState,
		bState,
		cState,
		dState,
		correctAnswer,
	} = useContext(ContextVariable);

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
								<Button
									variant="outline-primary"
									className="m-1"
									onClick={() => addActivities()}
								>
									Add
								</Button>
							</div>
						</Col>
						<Col md="9" className="mt-3">
							<Form.Group className="mb-3">
								<Form.Label>Question</Form.Label>
								<Form.Control
									type="text"
									placeholder="Question"
									value={question}
									onChange={(e) => setQuestion(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Answers</Form.Label>
								<Form.Control
									type="text"
									placeholder="A"
									value={aState}
									onChange={(e) => setAState(e.target.value)}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Control
									type="text"
									placeholder="B"
									value={bState}
									onChange={(e) => setBState(e.target.value)}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Control
									type="text"
									placeholder="C"
									value={cState}
									onChange={(e) => setCState(e.target.value)}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Control
									type="text"
									placeholder="D"
									value={dState}
									onChange={(e) => setDState(e.target.value)}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Correct Answer</Form.Label>
								{/* <Form.Control
									type="text"
									placeholder="Correct Answer"
									value={correctAnswer}
									onChange={(e) => setCorrectAnswer(e.target.value)}
								/> */}
								<Dropdown className="mt-3">
									<Dropdown.Toggle>
										Pick a letter of correct answer: {correctAnswer}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item onClick={() => setCorrectAnswer('a')}>
											A
										</Dropdown.Item>
										<Dropdown.Item onClick={() => setCorrectAnswer('b')}>
											B
										</Dropdown.Item>
										<Dropdown.Item onClick={() => setCorrectAnswer('c')}>
											C
										</Dropdown.Item>
										<Dropdown.Item onClick={() => setCorrectAnswer('d')}>
											D
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
								<Form.Text className="mt-1" muted>
									The correct answer must be the LETTER.
								</Form.Text>
							</Form.Group>
						</Col>
					</Row>
				</div>
			</Container>
		</>
	);
};

export default CreateQuiz;
