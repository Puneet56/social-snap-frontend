import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../context/AuthContext';

function PrivateRoute(props) {
	const { component, path, ...others } = props;
	const { user } = useAuth();

	return (
		<>
			{user ? (
				<Route path={path} component={component} {...others} />
			) : (
				<Redirect to='/signup' />
			)}
		</>
	);
}

export default PrivateRoute;
