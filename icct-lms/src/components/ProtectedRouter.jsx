import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';

const ProtectedRoute = ({ children }) => {
	const { user } = useContext(ContextVariable);

	if (!user) {
		return <Navigate to="/" replace />;
	}
	return children;
};

export default ProtectedRoute;
