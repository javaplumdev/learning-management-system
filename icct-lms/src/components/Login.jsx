// React
import { useContext, useState } from 'react';
// Bootstrap
import { Form, Button, Container, Alert } from 'react-bootstrap';
// React router DOM
import { Link, useNavigate } from 'react-router-dom';
// Context
import { ContextVariable } from '../context/context-config';

const Login = () => {
	const { signIn } = useContext(ContextVariable);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signIn(email, password);
			navigate('/homepage');
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<div className="loginFormContainer p-3">
			<Container className="shadow p-4" style={{ width: '360px' }}>
				<Form onSubmit={handleSubmit}>
					<h3 className="text-center display-6">Log in</h3>
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
						<Button className="w-100" type="submit">
							Login
						</Button>
					</Form.Group>
					<hr></hr>
					<Form.Group
						className="mb-3 text-center "
						controlId="exampleForm.ControlTextarea1"
					>
						<p>
							Forget account?{' '}
							<Link to="/signup" className="text-decoration-none text-primary">
								Sign up
							</Link>
						</p>
					</Form.Group>
				</Form>
			</Container>
		</div>
	);
};

export default Login;
