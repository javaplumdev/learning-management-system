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
		} catch (error) {
			console.log(error.message);
		}
	};

	console.log(user);

	return (
		<>
			{!user ? (
				<>
					<p>Hi</p>
				</>
			) : (
				<>
					<div className="p-4 box mt-3 text-center">
						Hello Welcome <br />
						<p>{user.email}</p>
					</div>
					<div className="d-grid gap-2">
						<Button variant="primary" onClick={handleLogout}>
							Log out
						</Button>
					</div>
				</>
			)}
		</>
	);
};

export default Homepage;
