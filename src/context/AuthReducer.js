const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_START':
			return {
				user: null,
				isFetching: true,
				error: false,
				token: null,
			};
		case 'LOGIN_SUCCESS':
			return {
				user: action.payload,
				isFetching: false,
				error: false,
				token: localStorage.getItem('social-snap-token'),
			};
		case 'LOGIN_FAILURE':
			return {
				user: null,
				isFetching: false,
				error: action.payload,
				token: null,
			};
		case 'LOGOUT':
			return {
				user: null,
				isFetching: false,
				error: false,
				token: null,
			};
		case 'FOLLOW':
			return {
				...state,
				user: {
					...state.user,
					following: [...state.user.followings, action.payload],
				},
			};
		case 'UNFOLLOW':
			return {
				...state,
				user: {
					...state.user,
					following: state.user.followings.filter(
						(following) => following !== action.payload
					),
				},
			};
		default:
			return state;
	}
};

export default AuthReducer;
