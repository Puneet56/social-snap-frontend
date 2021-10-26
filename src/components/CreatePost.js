import React, { useRef } from 'react';
import tw from 'tailwind-styled-components';
import { MdPhotoLibrary } from 'react-icons/md';
import { BiSend } from 'react-icons/bi';
import { useAuth } from '../context/AuthContext';
import Compressor from 'compressorjs';
import axios from 'axios';
import { useHistory } from 'react-router';

const Container = tw.div`mx-auto max-w-2xl my-3 rounded-2xl w-11/12 bg-fbnav flex flex-col 
`;
const InputDiv = tw.div`flex items-center justify-start m-4
`;
const UserImage = tw.img`w-[11%] h-[80%] rounded-full m-2 bg-fbhover  object-cover
`;
const Input = tw.input`h-9 text-gray-300 rounded-full pl-3 w-10/12 outline-none transform transition-all duration-200 bg-fbhover input-cursor border-4 border-solid border-gray-400 border-opacity-50 box-content
`;
const BouttonsDiv = tw.div`flex items-center justify-center hover:bg-fbhover p-1 px-3 rounded-lg cursor-pointer
`;
const url = process.env.REACT_APP_URL;

function CreatePost() {
	const { user } = useAuth();
	const inputRef = useRef();
	const imageRef = useRef();
	const imageInputRef = useRef();
	const history = useHistory();

	const showImage = (event) => {
		const image = event.target.files[0];
		new Compressor(image, {
			quality: 0.6,
			maxWidth: 600,
			maxHeight: 600,
			resize: 'cover',
			success: (compressedResult) => {
				const reader = new FileReader();
				reader.onload = (event) => {
					console.log(imageRef);
					imageRef.current.src = event.target.result;
					console.log(event.target.result);
				};
				reader.readAsDataURL(compressedResult);
			},
			error(err) {
				console.log(err);
			},
		});
	};

	const sendPost = async () => {
		if (
			!/[a-zA-Z]/g.test(inputRef.current.value) ||
			!/[a-zA-Z]/g.test(imageRef.current.src)
		) {
			alert('Enter Something in Input or Select an Image');
			return;
		}
		if (inputRef.current.value.length > 500) {
			alert('Enter less than 500 characters');
			return;
		}

		const data = {
			userId: user._id,
			description: inputRef.current.value,
			image: imageRef.current.src,
		};
		try {
			const res = await axios.post(url + '/api/posts', data);
			if (res.status === 200) {
				history.go(0);
			}
		} catch (error) {
			alert('Some Error Occoured');
			console.log(error);
		}
	};

	return (
		<Container>
			<InputDiv>
				<UserImage src={user.profilePicture}></UserImage>
				<Input
					type='text'
					ref={inputRef}
					placeholder={`What's on Your Mind?`}
				/>
			</InputDiv>
			<img
				src=''
				alt=''
				ref={imageRef}
				className='max-h-[30vh] object-contain bg-fbhover'
			/>
			<input
				onChange={showImage}
				type='file'
				accept='image/*'
				className='hidden'
				ref={imageInputRef}
			/>
			<div className='w-11/12 border-b rounded-lg mx-auto border-fbhover'></div>
			<div className='w-full flex items-center justify-evenly'>
				<BouttonsDiv onClick={() => imageInputRef.current.click()}>
					<MdPhotoLibrary className='text-green-500 w-8 h-8 mr-2' />
					<p>Photo/Video</p>
				</BouttonsDiv>
				<BouttonsDiv onClick={sendPost}>
					Send Post <BiSend className='text-yellow-500 w-8 h-8 mr-2' />
				</BouttonsDiv>
			</div>
		</Container>
	);
}

export default CreatePost;
