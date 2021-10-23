import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import CreatePost from '../CreatePost';
import PostItem from './PostItem';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Container = tw.div`w-full h-[90%] overflow-x-hidden overflow-y-auto flex flex-col items-center justify-start mb-96
`;
const url = process.env.REACT_APP_URL;

function Posts(props) {
	const [posts, setPosts] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		const getPosts = async () => {
			try {
				const fetchedposts = await axios.get(
					url + `/api/posts/timeline/${user._id}`
				);
				setPosts(fetchedposts.data);
			} catch (error) {
				console.log(error);
			}
		};
		getPosts();
	}, [user]);

	return (
		<>
			<Container>
				{props.home && <CreatePost />}
				{posts
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.map((post) => {
						return <PostItem post={post} key={post._id} />;
					})}
			</Container>
		</>
	);
}

export default Posts;
