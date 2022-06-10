//React
import { useContext } from 'react';
// Context
import { ContextVariable } from '../context/context-config';
// Context
import { Navigate } from 'react-router-dom';

const ProtectedRouter = ({ children }) => {
	const { user } = useContext(ContextVariable);

	if (!user) {
		<Navigate to="/" />;
	}

	return children;
};

export default ProtectedRouter;
