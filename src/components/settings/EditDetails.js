import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import Loader from '../loader/Loader';
import { useAuth } from '../../context/AuthContext';

const Input = tw.input`h-9 text-gray-300 rounded-full px-3 w-10/12 outline-none transform transition-all duration-200 bg-fbhover input-cursor border-4 border-solid border-gray-400 border-opacity-50 box-content
`;
const UserImage = tw.div`overflow-hidden relative rounded-full w-24 h-24 bg-fbhover origin-center  object-contain object-center z-30
`;

const EditProfile = tw.button`h-10 m-1 px-5 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none disabled:cursor-not-allowed
`;

const url = process.env.REACT_APP_URL;

const EditDetails = () => {
	const { user, error, dispatch, isFetching } = useAuth();

	const username = useRef();
	const email = useRef();
	const password = useRef();
	const dob = useRef();
	const hometown = useRef();
	const history = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();
		dispatch({ type: 'LOGIN_START' });
		try {
			const user = await axios.post(url + '/api/auth/register', {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
				dob: dob.current.value,
				hometown: hometown.current.value,
			});
			localStorage.setItem('social-snap-token', user.data.token);
			dispatch({ type: 'LOGIN_SUCCESS', payload: user.data.user });
		} catch (error) {
			dispatch({ type: 'LOGIN_FAILURE', err: error });
		}
	};

	return (
		<>
			{isFetching && <Loader />}
			<div className=' h-full items-center justify-start flex flex-col mb-48'>
				{error ? (
					typeof error === 'string' ? (
						<h1>{error}</h1>
					) : (
						<h1>Some error occoured</h1>
					)
				) : (
					''
				)}
				<form
					onSubmit={handleSubmit}
					className='bg-fbnav border border-solid rounded-lg m-2 flex flex-col items-center justify-center space-y-4 p-4 w-96'
				>
					<h1 className='text-4xl font-bold'>Edit Details</h1>
					<UserImage>
						<img
							src={user.profilePicture}
							alt='user'
							className='w-full h-full'
						></img>
					</UserImage>

					<EditProfile>Set Profile Picture</EditProfile>

					<label>Set Full Name</label>
					<Input
						required
						type='text'
						placeholder={user.username}
						ref={username}
					></Input>
					<label>Update Description</label>
					<Input
						required
						type='text'
						placeholder='Describe Yourself'
						ref={username}
					></Input>
					<label>Set Date of Birth</label>
					<Input type='date' required ref={dob}></Input>
					<label>Enter Hometown</label>
					<Input
						type='text'
						required
						placeholder={user.hometown}
						ref={hometown}
					></Input>
					<label>Set New Password</label>
					<Input
						required
						type='password'
						placeholder='New password'
						ref={password}
					></Input>
					<button
						type='submit'
						className='w-36 h-12 mt-5 rounded-sm bg-blue-700 text-center border-solid border border-blue-700'
					>
						Save Details
					</button>
				</form>
			</div>
		</>
	);
};

export default EditDetails;
