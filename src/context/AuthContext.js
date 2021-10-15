import React, { useEffect, useContext, createContext, useReducer } from 'react';
import axios from 'axios';

import AuthReducer from './AuthReducer';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

const initialState = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	isLoading: false,
	error: false,
};

const url = process.env.REACT_APP_URL;

export const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	console.log(state);

	useEffect(() => {
		let user = JSON.parse(localStorage.getItem('user'));
		if (localStorage.getItem('user') !== null) {
			console.log('old user found');
			const getUserdetails = async () => {
				try {
					const fetchedUser = await axios.get(url + `/api/users/${user._id}`);
					dispatch({ type: 'LOGIN_SUCESS', payload: fetchedUser.data });
				} catch (error) {
					console.log(error);
				}
			};
			getUserdetails();
		}
		localStorage.setItem('user', JSON.stringify(state.user));
	}, [state.user]);

	const value = {
		user: state.user,
		isFetching: state.isFetching,
		error: state.error,
		dispatch,
	};

	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	);
};
