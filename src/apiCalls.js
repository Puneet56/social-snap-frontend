import axios from 'axios';

const url = process.env.REACT_APP_URL;

export const loginCall = async (userCredential, dispatch) => {
	dispatch({ type: 'LOGIN_START' });
	try {
		const res = await axios.post(url + '/api/auth/login', userCredential);
		if (typeof res.data !== 'object') {
			dispatch({ type: 'LOGIN_FAILURE', payload: res.data });
		} else {
			localStorage.setItem('social-snap-token', res.data.token);
			dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
		}
	} catch (err) {
		console.log(err);
		dispatch({ type: 'LOGIN_FAILURE', payload: err });
	}
};

export const signUpCall = async (userCredential, dispatch) => {
	dispatch({ type: 'LOGIN_START' });
	try {
		const res = await axios.post(url + '/api/auth/register', userCredential);
		if (typeof res.data !== 'object') {
			dispatch({ type: 'LOGIN_FAILURE', payload: res.data });
		} else {
			await axios.put(
				url + `/api/users/616d263dfef11cda511c3ea1/follow`,
				{
					userId: res.data.user._id,
				},
				{
					headers: { Authorization: `${res.data.token}` },
				}
			);
			localStorage.setItem('social-snap-token', res.data.token);
			dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
		}
	} catch (err) {
		console.log(err);
		dispatch({ type: 'LOGIN_FAILURE', payload: err });
	}
};
export const loginAsGuest = async (dispatch) => {
	dispatch({ type: 'LOGIN_START' });
	try {
		const res = await axios.get(url + '/api/auth/guest');
		if (typeof res.data !== 'object') {
			dispatch({ type: 'LOGIN_FAILURE', payload: res.data });
		} else {
			localStorage.setItem('social-snap-token', res.data.token);
			dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
		}
	} catch (err) {
		console.log(err);
		dispatch({ type: 'LOGIN_FAILURE', payload: err });
	}
};
