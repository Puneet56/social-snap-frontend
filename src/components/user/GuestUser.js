import React from 'react';
import { loginAsGuest } from '../../apiCalls';
import { useAuth } from '../../context/AuthContext';

function GuestUser() {
	const { dispatch } = useAuth();

	const loginGuest = () => {
		loginAsGuest(dispatch);
	};

	return (
		<button
			onClick={loginGuest}
			className='w-52 bg-blue-600 min-h-[3rem] text-white'
		>
			Try as Guest User
		</button>
	);
}

export default GuestUser;
