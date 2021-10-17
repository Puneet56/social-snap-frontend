import React, { useEffect, useContext, createContext, useReducer } from 'react';
import axios from 'axios';

import AuthReducer from './AuthReducer';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

const initialState = {
	token: localStorage.getItem('social-snap-token') || null,
	user: null,
	isLoading: false,
	error: false,
};

const url = process.env.REACT_APP_URL;

export const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	console.log(state);

	useEffect(() => {
		let token = localStorage.getItem('social-snap-token');
		if (localStorage.getItem('social-snap-token') !== null) {
			console.log('token found');
			const verifyToken = async () => {
				try {
					const res = await axios.get(url + '/api/auth/verify', {
						headers: { Authorization: `${token}` },
					});
					const getUserdetails = async () => {
						try {
							const fetchedUser = await axios.get(
								url + `/api/users/${res.data}`
							);
							dispatch({ type: 'LOGIN_SUCCESS', payload: fetchedUser.data });
						} catch (error) {
							console.log(error);
						}
					};
					getUserdetails();
				} catch (error) {
					console.log('error happened');
					console.log(error);
				}
			};
			verifyToken();
		} else {
			localStorage.setItem('social-snap-token', state.token);
		}
	}, [state.token]);

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
