import React, { useEffect, useContext, createContext, useReducer } from 'react';
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

export const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(state.user));
	}, [state.user]);

	console.log(state);

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
