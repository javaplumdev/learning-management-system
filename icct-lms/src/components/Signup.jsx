// React
import React, { useState, useContext } from 'react';
// Bootstrap
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
// React router DOM
import { Link, useNavigate } from 'react-router-dom';
// Context
import { ContextVariable } from '../context/context-config';

const Signup = () => {
	const { signUp } = useContext(ContextVariable);
	const [radioValue, setRadioValue] = useState('1');
	const navigate = useNavigate();

	const radios = [
		{ name: 'Student', value: '1' },
		{ name: 'Teacher', value: '2' },
	];

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [studentType, setStudentType] = useState(radioValue);
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signUp(email, password, studentType);
			navigate('/');
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<Container className="shadow p-4" style={{ width: '360px' }}>
			<Form onSubmit={handleSubmit}>
				<h3 className="text-center display-6">Sign up</h3>
				{error && <Alert variant="danger">{error}</Alert>}

				<Form.Group className="my-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="text"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>What are you?</Form.Label>
					<br></br>
					<ButtonGroup className="w-100">
						{radios.map((radio, idx) => (
							<ToggleButton
								key={idx}
								id={`radio-${idx}`}
								type="radio"
								variant={idx % 2 ? 'outline-primary' : 'outline-primary'}
								name="radio"
								value={radio.value}
								checked={radioValue === radio.value}
								onChange={(e) => setRadioValue(e.currentTarget.value)}
							>
								{radio.name}
							</ToggleButton>
						))}
					</ButtonGroup>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Button className="w-100" type="submit">
						Create Account
					</Button>
				</Form.Group>
				<hr></hr>
				<Form.Group
					className="mb-3 text-center "
					controlId="exampleForm.ControlTextarea1"
				>
					<p>
						Already have an account?{' '}
						<Link to="/" className="text-decoration-none text-primary">
							Log in
						</Link>
					</p>
				</Form.Group>
			</Form>
		</Container>
	);
};

export default Signup;
