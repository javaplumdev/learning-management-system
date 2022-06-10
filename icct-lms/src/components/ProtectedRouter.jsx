import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';

const ProtectedRoute = ({ children }) => {
	const { user } = useContext(ContextVariable);

	console.log('Check user in Private: ', user);
	if (!user) {
		return <Navigate to="/" />;
	}
	return children;
};

export default ProtectedRoute;
