// eslint-disable-next-line
import { useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { loginCall } from '../apiCalls';
import { useAuth } from '../context/AuthContext';

const Input = tw.input`h-9 text-gray-300 rounded-full pl-3 w-10/12 outline-none transform transition-all duration-200 bg-fbhover input-cursor border-4 border-solid border-gray-400 border-opacity-50 box-content
`;

const Login = () => {
	const email = useRef();
	const password = useRef();
	const history = useHistory();
	const { dispatch, error, user } = useAuth();

	useEffect(() => {
		if (user && typeof user === 'object') {
			history.push('/');
		}
	}, [history, user]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			loginCall(
				{
					email: email.current.value,
					password: password.current.value,
				},
				dispatch
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className=' h-full items-center justify-center flex flex-col'>
				<p className='text-3xl lg:text-7xl lg:font-medium m-5'>
					Welcome To Social Snap
				</p>
				<p className='text-xl lg:text-5xl lg:font-medium m-5'>
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
					<h1 className='text-4xl font-bold'>Login</h1>
					<label>Enter Email</label>
					<Input
						type='email'
						placeholder='Enter email'
						required
						ref={email}
					></Input>
					<label>Enter Password</label>
					<Input
						type='password'
						required
						placeholder='Enter password'
						ref={password}
					></Input>
					<button
						type='submit'
						className='w-36 h-12 mt-5 rounded-sm bg-blue-700 text-center border-solid border border-blue-700'
					>
						Login
					</button>
					<h2>Do not Have an Account? </h2>
					<Link to='/signup'>
						<button className='w-52 bg-green-600 h-12 text-white'>
							Create a new Account
						</button>
					</Link>
				</form>
			</div>
		</>
	);
};

export default Login;
