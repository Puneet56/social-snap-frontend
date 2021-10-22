import React from 'react';
import tw from 'tailwind-styled-components';
import { useAuth } from '../../context/AuthContext';

const Button = tw.button`bg-red-500 min-w-[7rem] min-h-[4rem] text-white font-medium my-5
`;

function SignOut() {
	const { dispatch } = useAuth();
	const logout = () => {
		localStorage.removeItem('social-snap-token');
		dispatch({ type: 'LOGOUT' });
	};

	return <Button onClick={logout}>Sign Out</Button>;
}

export default SignOut;
