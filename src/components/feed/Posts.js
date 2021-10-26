import React, { useState, useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
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
	const [loading, setLoading] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		setLoading(true);
		const getPosts = async () => {
			try {
				const fetchedposts = await axios.get(
					url + `/api/posts/timeline/${user._id}`
				);
				setPosts(fetchedposts.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		getPosts();
	}, [user]);

	return (
		<>
			<Container>
				{props.home && <CreatePost />}
				{loading ? (
					<BiLoaderAlt className='text-yellow-500 w-8 h-8 mx-2 transform transition-all animate-spin' />
				) : (
					<>
						{posts.length === 0 ? (
							<p>No Posts, Create One or Follow others to see their posts</p>
						) : (
							posts
								.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								.map((post) => {
									return <PostItem post={post} key={post._id} />;
								})
						)}
					</>
				)}
			</Container>
		</>
	);
}

export default Posts;
