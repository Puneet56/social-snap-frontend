import React, { useState, useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import tw from 'tailwind-styled-components';
import CreatePost from '../CreatePost';
import PostItem from './PostItem';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Container = tw.div`w-full h-[90%] overflow-x-hidden overflow-y-auto flex flex-col items-center justify-start pb-14
`;

const url = process.env.REACT_APP_URL;

function Posts(props) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [postsLoading, setPostsLoading] = useState(false);
	const [page, setPage] = useState(1);

	const { token, user } = useAuth();
	useEffect(() => {
		setLoading(true);
		const getPosts = async () => {
			try {
				const fetchedposts = await axios.get(
					url + `/api/posts/timeline/${user._id}/?page=1`,
					{
						headers: { Authorization: `${token}` },
					}
				);
				setPosts(fetchedposts.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		getPosts();
	}, [user, token]);

	const addPost = (newPost) => {
		setPosts((prevPosts) => [...prevPosts, newPost]);
	};

	const deletePost = (post) => {
		setPosts((prevPosts) => prevPosts.filter((item) => item._id !== post._id));
	};

	const getMorePosts = async () => {
		setPostsLoading(true);
		try {
			const fetchedposts = await axios.get(
				url + `/api/posts/timeline/${user._id}/?page=${page + 1}`,
				{
					headers: { Authorization: `${token}` },
				}
			);
			if (fetchedposts.data.length !== 0) {
				setPosts((prevPosts) => [...fetchedposts.data, ...prevPosts]);
				setPage(page + 1);
			}
			setPostsLoading(false);
		} catch (error) {
			console.log(error);
			setPostsLoading(false);
		}
	};

	const editPostHandler = (editedPost) => {
		setPosts((prevPosts) => {
			const otherPosts = prevPosts.filter(
				(item) => item._id !== editedPost._id
			);
			return [editedPost, ...otherPosts];
		});
	};

	return (
		<>
			<Container>
				{props.home && <CreatePost addPost={addPost} />}
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
									return (
										<PostItem
											post={post}
											key={post._id}
											deletePostFromState={deletePost}
											editPostInState={editPostHandler}
										/>
									);
								})
						)}
						<button
							className='px-2 py-3 active:outline-none'
							disabled={postsLoading}
							onClick={getMorePosts}
						>
							{postsLoading ? (
								<BiLoaderAlt className='text-yellow-500 w-8 h-8 mx-2 transform transition-all animate-spin' />
							) : (
								'See More'
							)}
						</button>
					</>
				)}
			</Container>
		</>
	);
}

export default Posts;
