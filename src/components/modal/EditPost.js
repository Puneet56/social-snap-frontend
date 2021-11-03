import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import Compressor from 'compressorjs';
import { useAuth } from '../../context/AuthContext';

const Container = tw.div`relative md:w-3/5 w-11/12 max-h-[90vh] flex flex-col items-center rounded-3xl bg-fbnav p-4 space-y-3 overflow-auto
`;

const Input = tw.input`min-h-[3rem] text-gray-300 rounded-full pl-3 w-11/12 outline-none transform transition-all duration-200 bg-fbhover input-cursor border-4 border-solid border-gray-400 border-opacity-50 box-content
`;

const Button = tw.button`bg-red-500 min-w-[7rem] min-h-[3rem] text-white font-medium rounded-md shadow-lg 
${(p) => (p.$green ? '!bg-green-500' : '')} 
${(p) => (p.$blue ? '!bg-blue-600' : '')}
`;

const PostImage = tw.img`w-full bg-fbhover object-contain drop-shadow-lg rounded-2xl overflow-hidden
`;
const Heading = tw.p`w-11/12 pl-2 text-white
`;
const Cross = tw.p`absolute right-12 top-36 w-12 h-12 rounded-full bg-red-400 text-white flex items-center justify-center text-3xl cursor-pointer
`;

const url = process.env.REACT_APP_URL;

function EditPost({ post, deletePostFromState, editPostInState }) {
	const { description, _id, image, userId } = post;
	const [deleting, setDeleting] = useState(false);
	const [saving, setSaving] = useState(false);
	const [addingPhoto, setAddingPhoto] = useState(false);
	const [error, setError] = useState(false);
	const { token } = useAuth();

	const inputRef = useRef();
	const imageRef = useRef();
	const fileInput = useRef();

	const [addedImage, setAddedImage] = useState(image);

	const deletePost = async () => {
		setDeleting(true);
		try {
			const res = await axios.put(
				url + `/api/posts/${_id}/delete`,
				{
					userId: userId,
				},
				{
					headers: { Authorization: `${token}` },
				}
			);
			if (res.status === 200) {
				setDeleting(false);
				deletePostFromState(post);
			} else {
				setDeleting(false);
				alert('Error Deleting Post');
			}
		} catch (error) {
			console.log(error);
			setDeleting(false);
		}
	};

	useEffect(() => {
		inputRef.current.value = description;
	});

	const showImage = (event) => {
		setAddingPhoto(true);
		const image = event.target.files[0];
		new Compressor(image, {
			quality: 0.6,
			maxWidth: 600,
			maxHeight: 600,
			resize: 'cover',
			success: (compressedResult) => {
				const reader = new FileReader();
				reader.onload = (event) => {
					imageRef.current.src = event.target.result;
					setAddedImage(event.target.result);
					setAddingPhoto(false);
				};
				reader.readAsDataURL(compressedResult);
			},
			error(err) {
				setAddingPhoto(false);
				console.log(err);
			},
		});
	};

	const editPostHandler = async () => {
		setSaving(true);
		try {
			const res = await axios.put(url + `/api/posts/${_id}`, {
				userId: userId,
				description: inputRef.current.value,
				image: addedImage,
			});
			if (res.status === 200) {
				setError('Post Updated Sucessfully');
				editPostInState(res.data);
				setSaving(false);
			} else {
				setError('Some Error Occoured');
				setSaving(false);
			}
		} catch (error) {
			setError('Error editing Post');
			console.log(error);
			setSaving(false);
		}
	};

	const removeImage = () => {
		setAddedImage('');
	};

	return (
		<Container onClick={(e) => e.stopPropagation()}>
			{error && <Heading>{error}</Heading>}
			{addedImage !== '' && <Cross onClick={removeImage}>X</Cross>}
			<Heading>Description</Heading>
			<Input ref={inputRef} type='textarea' />
			<PostImage
				ref={imageRef}
				src={addedImage}
				onClick={() => fileInput.current.click()}
			/>
			<input
				type='file'
				className='hidden'
				ref={fileInput}
				accept='image/*'
				onChange={showImage}
			/>
			{addedImage === '' && (
				<Button
					$blue
					disabled={addingPhoto}
					onClick={() => fileInput.current.click()}
				>
					{addingPhoto ? 'Adding...' : 'Add Photo'}
				</Button>
			)}
			<Button $green disabled={saving} onClick={editPostHandler}>
				{saving ? 'Saving...' : 'Save Post'}
			</Button>
			<Button disabled={deleting} onClick={deletePost}>
				{deleting ? 'Deleting...' : 'Delete Post'}
			</Button>
		</Container>
	);
}

export default EditPost;
