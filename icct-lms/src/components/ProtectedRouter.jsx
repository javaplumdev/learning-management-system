import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';

const ProtectedRoute = ({ children }) => {
	const { user } = useContext(ContextVariable);

	const [isLoggedIn, setIsLoggedIn] = useState(null);

	// useEffect(() => {
	// 	const isLogIn = localStorage.getItem('isLoggedIn');
	// 	if (isLogIn) {
	// 		setIsLoggedIn(isLogIn);
	// 	}
	// });

	if (!user) {
		return <Navigate to="/" replace />;
	}
	return children;
};

export default ProtectedRoute;
