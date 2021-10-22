import { useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import Loader from '../components/loader/Loader';
import { useAuth } from '../context/AuthContext';
import { signUpCall } from '../apiCalls';

const Input = tw.input`h-9 text-gray-300 rounded-full px-3 w-10/12 outline-none transform transition-all duration-200 bg-fbhover input-cursor border-4 border-solid border-gray-400 border-opacity-50 box-content
`;

const SignUp = () => {
	const { user, error, dispatch, isFetching } = useAuth();
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const dob = useRef();
	const hometown = useRef();
	const history = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const userCredentials = {
			username: username.current.value,
			email: email.current.value,
			password: password.current.value,
			dob: dob.current.value,
			hometown: hometown.current.value,
		};

		signUpCall(userCredentials, dispatch);
	};

	useEffect(() => {
		if (user && typeof user === 'object') {
			history.push('/');
		}
	}, [history, user]);

	return (
		<>
			{isFetching && <Loader />}
			<div className=' h-full items-center justify-start flex flex-col overflow-auto'>
				<p className='text-3xl lg:text-5xl lg:font-medium m-5 mt-16'>
					Welcome To Social Snap
				</p>
				<p className='text-xl lg:text-3xl lg:font-medium m-5'>
					Connect to the World!
				</p>
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
					<h2>Already have an Account? </h2>
					<Link to='/login'>
						<button className='w-52 bg-green-600 h-12 text-white'>
							Log In
						</button>
					</Link>
					<h1 className='text-4xl font-bold'>SignUp</h1>
					<label>Enter Full Name</label>
					<Input
						required
						type='text'
						placeholder='Enter Full Name'
						ref={username}
					></Input>
					<label>Enter Email</label>
					<Input
						type='text'
						required
						placeholder='Enter email'
						ref={email}
					></Input>
					<label>Enter Date of Birth</label>
					<Input type='date' required ref={dob}></Input>
					<label>Enter Hometown</label>
					<Input
						type='text'
						required
						placeholder='Enter Hometown'
						ref={hometown}
					></Input>
					<label>Enter Password</label>
					<Input
						required
						type='password'
						placeholder='Enter password'
						ref={password}
					></Input>
					<button
						type='submit'
						className='w-36 h-12 mt-5 rounded-sm bg-blue-700 text-center border-solid border border-blue-700'
					>
						SignUp
					</button>
				</form>
			</div>
		</>
	);
};

export default SignUp;
