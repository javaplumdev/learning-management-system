import { useContext, useEffect } from 'react';
// Context
import { ContextVariable } from '../context/context-config';
// React DOM
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
	const { userData, userID } = useContext(ContextVariable);
	const navigate = useNavigate();

	return (
		<>
			{useEffect(() => {
				userData.map((item) => {
					if (item.id === userID) {
						if (item.userType === '1') {
							navigate('/teacherhomepage');
						} else if (item.userType === '2') {
							navigate('/studenthomepage');
						}
					}
				});
			}, [])}
		</>
	);
};

export default Homepage;
