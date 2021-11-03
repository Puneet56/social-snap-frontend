import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import tw from 'tailwind-styled-components';
import Loader from '../loader/Loader';
import { useAuth } from '../../context/AuthContext';
import Compressor from 'compressorjs';

const Input = tw.input`h-9 text-gray-300 rounded-full px-3 w-10/12 outline-none transform transition-all duration-200 bg-fbhover input-cursor border-4 border-solid border-gray-400 border-opacity-50 box-content
`;
const UserImage = tw.div`overflow-hidden relative rounded-full min-w-[8rem] min-h-[8rem] max-w-[8rem] max-h-[8rem] my-5 bg-fbhover origin-center object-center z-30
`;
const EditProfile = tw.button`min-h-[3rem] m-1 px-5 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none disabled:cursor-not-allowed
`;

const url = process.env.REACT_APP_URL;

const EditDetails = () => {
	const { user, isFetching, token } = useAuth();
	const [showuser, setUser] = useState(user);
	const compressedref = useRef();
	const imageInput = useRef();
	const [error, setError] = useState();

	const username = useRef();
	const password = useRef();
	const dob = useRef();
	const hometown = useRef();
	const description = useRef();

	useEffect(() => {
		const getUserdetails = async () => {
			try {
				const fetchedUser = await axios.get(url + `/api/users/${user._id}`, {
					headers: { Authorization: `${token}` },
				});
				setUser(fetchedUser.data);
			} catch (error) {
				console.log(error);
			}
		};
		getUserdetails();
	}, [user, error, token]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		let data = {};

		data.userId = user._id;

		if (username.current.value !== '') {
			data.username = username.current.value;
		}
		if (password.current.value !== '') {
			data.password = password.current.value;
		}
		if (dob.current.value !== '') {
			data.dob = dob.current.value;
		}
		if (hometown.current.value !== '') {
			data.hometown = hometown.current.value;
		}
		if (description.current.value !== '') {
			data.description = description.current.value;
		}

		if (
			username.current.value !== '' ||
			password.current.value !== '' ||
			dob.current.value !== '' ||
			hometown.current.value !== '' ||
			description.current.value !== ''
		) {
			try {
				const res = await axios.put(url + `/api/users/${user._id}`, data, {
					headers: { Authorization: `${token}` },
				});
				setError(res.data);
				alert(res.data);
				username.current.value = '';
			} catch (err) {
				console.log(err);
				setError('Error updating Profile');
				alert(error);
			}
		} else {
			setError('Nothing to Update');
		}
	};

	const editProfilePhoto = (event) => {
		console.log('happened');
		const image = event.target.files[0];
		new Compressor(image, {
			quality: 0.8,
			maxWidth: 250,
			maxHeight: 250,
			resize: 'cover',
			success: (compressedResult) => {
				const reader = new FileReader();
				console.log('reached happened');
				reader.onload = (event) => {
					console.log('reached here');
					compressedref.current.src = event.target.result;
					console.log(event.target.result);
					axios
						.put(
							url + `/api/users/${user._id}`,
							{
								userId: user._id,
								profilePicture: event.target.result,
							},
							{
								headers: { Authorization: `${token}` },
							}
						)
						.then((res) => {
							console.log(res);
						})
						.catch((err) => {
							console.log(err);
						});
				};
				reader.readAsDataURL(compressedResult);
			},
			error(err) {
				console.log(err);
			},
		});
	};

	return (
		<>
			{isFetching && <Loader />}
			<div className=' h-full items-center justify-start flex flex-col mb-80'>
				<div></div>
				<UserImage>
					<img
						src={user.profilePicture}
						ref={compressedref}
						alt='user'
						className='w-full h-full object-cover'
					></img>
				</UserImage>
				<input
					accept='image/*'
					type='file'
					ref={imageInput}
					onChange={editProfilePhoto}
					className='hidden'
				/>
				<EditProfile onClick={() => imageInput.current.click()}>
					Set Profile Picture
				</EditProfile>
				<form
					onSubmit={handleSubmit}
					className='bg-fbnav border border-solid rounded-lg m-2 flex flex-col items-center justify-center space-y-4 p-4 w-96'
				>
					<h1 className='text-4xl font-bold'>Edit Details</h1>
					<label>Set Full Name</label>
					<Input
						type='text'
						placeholder={showuser.username}
						ref={username}
					></Input>
					<label>Update Description</label>
					<Input
						type='text'
						placeholder='Describe Yourself'
						ref={description}
					></Input>
					<label>Set Date of Birth</label>
					<Input type='date' ref={dob}></Input>
					<label>Enter Hometown</label>
					<Input
						type='text'
						placeholder={showuser.hometown}
						ref={hometown}
					></Input>
					<label>Set New Password</label>
					<Input
						type='password'
						placeholder='New password'
						ref={password}
					></Input>
					{error ? (
						typeof error === 'string' ? (
							<h1>{error}</h1>
						) : (
							<h1>Some error occoured</h1>
						)
					) : (
						''
					)}
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
