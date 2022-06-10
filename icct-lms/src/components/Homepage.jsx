import { useContext } from 'react';
// React bootstrap
import { Button } from 'react-bootstrap';
// Context
import { ContextVariable } from '../context/context-config';
// React DOM
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
	const { logOut, user } = useContext(ContextVariable);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logOut();
			navigate('/');
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<>
			<p>{user.email}</p>
			<Button onClick={handleLogout}>Sign out</Button>
		</>
	);
};

export default Homepage;
