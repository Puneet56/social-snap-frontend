import React from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../context/AuthContext';

function Settings() {
	const { dispatch } = useAuth();

	const signout = () => {
		localStorage.removeItem('social-snap-token');
		dispatch({ type: 'LOGOUT' });
		console.log('clicked');
		<Redirect to='/login' />;
	};

	return (
		<div>
			<button onClick={signout}>Signout</button>
		</div>
	);
}

export default Settings;
