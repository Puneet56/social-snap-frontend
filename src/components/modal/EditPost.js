import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';

const Container = tw.div`md:w-2/5 w-11/12 max-h-[90vh] flex flex-col items-center rounded-3xl bg-fbnav p-4 space-y-3 overflow-auto
`;

const Input = tw.input`h-12 text-gray-300 rounded-full pl-3 w-11/12 outline-none transform transition-all duration-200 bg-fbhover input-cursor border-4 border-solid border-gray-400 border-opacity-50 box-content
`;

const Button = tw.button`bg-red-500 min-w-[7rem] min-h-[3rem] text-white font-medium rounded-md shadow-lg
`;

const PostImage = tw.img`w-full bg-fbhover object-contain drop-shadow-lg
`;
const Heading = tw.p`w-11/12 pl-2 text-white
`;

const url = process.env.REACT_APP_URL;

function EditPost({ post, deletePostFromState }) {
	const { description, _id, image, userId } = post;
	const [loading, setLoading] = useState(false);
	const inputRef = useRef();
	const deletePost = async () => {
		setLoading(true);
		try {
			const res = await axios.put(url + `/api/posts/${_id}/delete`, {
				userId: userId,
			});
			if (res.status === 200) {
				setLoading(false);
				deletePostFromState(post);
			} else {
				setLoading(false);
				alert('Error Deleting Post');
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		inputRef.current.value = description;
	});

	return (
		<Container onClick={(e) => e.stopPropagation()}>
			<Heading>Description</Heading>
			<Input ref={inputRef} type='textarea' />
			<PostImage src={image} />
			<Button onClick={deletePost}>
				{loading ? 'Deleting...' : 'Delete Post'}
			</Button>
		</Container>
	);
}

export default EditPost;
