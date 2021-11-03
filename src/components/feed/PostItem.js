import React, { useEffect, useState } from 'react';
import { HiThumbUp } from 'react-icons/hi';
import { BiLoaderAlt } from 'react-icons/bi';
import axios from 'axios';
import { AiFillEdit } from 'react-icons/ai';
import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Modal from '../modal/Modal';
import EditPost from '../modal/EditPost';
import TimesAgo from 'react-timesago';
import ViewPost from '../modal/ViewPost';

const Container = tw.div`max-h-[70vh] m-4 shadow-2xl w-[90%] rounded-xl bg-fbnav flex flex-col items-start justify-between relative
`;
const UserInfo = tw.div`w-full h-[4.3rem] p-1 flex items-center justify-start
`;
const UserImage = tw.img`h-[80%] rounded-full bg-fbhover mx-2	object-cover  
`;
const PostImage = tw.img`h-[70%] max-h-[24rem] w-full bg-fbhover object-contain drop-shadow-lg
`;
const LikesComments = tw.div`w-full h-16 flex items-center justify-between
`;
const LikeLogo = tw.div`mx-2 bg-gradient-to-b from-[#17a8fd] to-[#046ce4] text-white rounded-full flex items-center justify-center
`;
const EditButton = tw.div`absolute right-6 top-6 w-16 h-8 flex items-center justify-center cursor-pointer
`;

const url = process.env.REACT_APP_URL;

function PostItem({ post, deletePostFromState, editPostInState }) {
	const { userId, image, likes, comments, description, _id, createdAt } = post;
	const [likesNumber, setLikes] = useState(likes.length);
	const [showuser, setUser] = useState([]);
	const { user, token } = useAuth();
	const [openModal, setOpenModal] = useState(false);
	const [viewModal, setViewModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [liking, setLiking] = useState(false);
	const [liked, setLiked] = useState(post.likes.includes(user._id));

	useEffect(() => {
		setLoading(true);
		const getUserdetails = async () => {
			try {
				const fetchedUser = await axios.get(url + `/api/users/${userId}`, {
					headers: { Authorization: `${token}` },
				});
				setUser(fetchedUser.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		getUserdetails();
	}, [userId, token]);

	const handleLike = async () => {
		setLiking(true);
		try {
			const res = await axios.put(
				url + `/api/posts/${_id}/like`,
				{
					userId: user._id,
				},
				{
					headers: { Authorization: `${token}` },
				}
			);
			if (res.status === 200) {
				setLikes(res.data.likes);
				setLiking(false);
				setLiked(!liked);
			}
		} catch (error) {
			console.log(error);
			setLiking(false);
			setLiked(!liked);
		}
	};

	const closePostModal = () => {
		setOpenModal(false);
		setViewModal(false);
	};
	const openPostModal = () => {
		setOpenModal(true);
	};

	const openViewModel = () => {
		setViewModal(true);
	};

	return (
		<>
			{openModal && (
				<Modal close={closePostModal}>
					<EditPost
						post={post}
						deletePostFromState={deletePostFromState}
						editPostInState={editPostInState}
					/>
				</Modal>
			)}
			{viewModal && (
				<Modal close={closePostModal}>
					<ViewPost
						showuser={showuser}
						handleLike={handleLike}
						post={post}
						liking={liking}
						likesNumber={likesNumber}
					/>
				</Modal>
			)}
			{loading ? (
				<BiLoaderAlt className='text-yellow-500 w-8 h-8 mx-2 transform transition-all animate-spin' />
			) : (
				<>
					{showuser && (
						<Container>
							<Link className='tooltip' to={`/profile/${showuser._id}`}>
								<UserInfo>
									<span className='tooltiptext'>View Profile</span>
									<UserImage src={showuser.profilePicture}></UserImage>
									<div>
										<p>{showuser.username}</p>
										<p className='text-xs text-gray-400'>
											<TimesAgo time={createdAt} type='default' suffix='ago' />
										</p>
									</div>
								</UserInfo>
							</Link>

							{user._id === userId && (
								<EditButton onClick={openPostModal}>
									<AiFillEdit className='w-full h-full' /> Edit
								</EditButton>
							)}
							<p onClick={openViewModel} className='ml-2'>
								{description.length > 50
									? image.length !== 0
										? `${description.slice(0, 50)} ...view more`
										: description
									: description}
							</p>
							{/[a-zA-Z0-9]/g.test(image) && (
								<PostImage
									onClick={openViewModel}
									src={image}
									alt='user'
								></PostImage>
							)}
							<LikesComments>
								{liking ? (
									<p className='ml-8'>Liking...</p>
								) : (
									<div
										className='flex items-center cursor-pointer'
										onClick={handleLike}
									>
										<LikeLogo>
											<HiThumbUp className='w-8 h-8 p-1' />
										</LikeLogo>
										<p className={`${liked ? 'text-blue-500' : 'text-white'}`}>
											{likesNumber} {likesNumber === 1 ? 'Like' : 'Likes'}
										</p>
									</div>
								)}
								<p onClick={openViewModel} className='mr-2'>
									{comments} Comments
								</p>
							</LikesComments>
						</Container>
					)}
				</>
			)}
		</>
	);
}

export default PostItem;
