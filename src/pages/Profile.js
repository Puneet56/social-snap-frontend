import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import tw from 'tailwind-styled-components';
import axios from 'axios';
import PostItem from '../components/feed/PostItem';
import Loader from '../components/loader/Loader';
import CreatePost from '../components/CreatePost';
import { useAuth } from '../context/AuthContext';
import UserInfo from '../components/user/UserInfo';
import { BiLoaderAlt } from 'react-icons/bi';

const Container = tw.div`w-full max-h-full max-w-2xl mx-auto overflow-y-auto
`;
const CoverPhoto = tw.div`w-full mt-4 h-[30vh] object-fill object-center bg-green-500 rounded-2xl overflow-hidden 
`;
const UserImage = tw.div`overflow-hidden relative rounded-full w-48 h-48 bg-fbhover origin-center -mt-24 ml-[calc(50%-6rem)] object-contain object-center z-30
`;

const url = process.env.REACT_APP_URL;

function Profile() {
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const [showuser, setshowUser] = useState([]);
	const [page, setPage] = useState(1);
	const [postsLoading, setPostsLoading] = useState(false);

	const { user } = useAuth();

	const params = useParams();

	useEffect(() => {
		setLoading(true);
		const getUserdetails = async () => {
			try {
				const fetchedUser = await axios.get(
					url + `/api/users/${params.userid}`
				);
				setshowUser(fetchedUser.data);
			} catch (error) {
				console.log(error);
			}
		};

		const getPosts = async () => {
			try {
				const fetchedposts = await axios.get(
					url + `/api/posts/posts/${params.userid}/?page=1`
				);
				setPosts(fetchedposts.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		getUserdetails();
		getPosts();
	}, [params.userid, user]);

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
				url + `/api/posts/posts/${user._id}/?page=${page + 1}`
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
		setPage(page + 1);
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
		<Container>
			{loading && <Loader />}
			<CoverPhoto>
				<img
					className='w-full h-full'
					src={showuser.coverPicture}
					alt='cover'
				></img>
			</CoverPhoto>
			<UserImage>
				<img
					src={showuser.profilePicture}
					alt='user'
					className='w-full h-full'
				></img>
			</UserImage>
			<div className='w-full max-w-lg mx-auto mb-28 flex flex-col items-center justify-start'>
				{showuser && <UserInfo user={showuser} />}
				{showuser && params.userid === user._id && (
					<CreatePost addPost={addPost} />
				)}
				{posts
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
					})}
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
			</div>
		</Container>
	);
}

export default Profile;
