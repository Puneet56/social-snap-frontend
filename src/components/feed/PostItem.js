import React, { useEffect, useState } from 'react';
import { HiThumbUp } from 'react-icons/hi';
import axios from 'axios';

import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Container = tw.div`max-h-[70vh] m-4 shadow-2xl w-[90%] rounded-xl bg-fbnav flex flex-col items-start justify-between
`;
const UserInfo = tw.div`w-full h-16 p-1 flex items-center justify-start
`;
const UserImage = tw.img`h-[80%] rounded-full bg-fbhover mx-2	object-cover  
`;
const PostImage = tw.img`h-[70%] max-h-[24rem] w-full bg-fbhover object-contain drop-shadow-lg
`;
const LikesComments = tw.div`w-full h-16 flex items-center justify-between
`;
const LikeLogo = tw.div`mx-2 bg-gradient-to-b from-[#17a8fd] to-[#046ce4] text-white rounded-full flex items-center justify-center
`;

const url = process.env.REACT_APP_URL;

function PostItem({ post }) {
	const { userId, image, likes, comments, description, _id } = post;
	const [likesNumber, setLikes] = useState(likes.length);
	const [showuser, setUser] = useState();
	const { user } = useAuth();

	useEffect(() => {
		const getUserdetails = async () => {
			try {
				const fetchedUser = await axios.get(url + `/api/users/${userId}`);
				setUser(fetchedUser.data);
			} catch (error) {
				console.log(error);
			}
		};
		getUserdetails();
	}, [userId]);

	const handleLike = async () => {
		try {
			const res = await axios.put(url + `/api/posts/${_id}/like`, {
				userId: user._id,
			});
			if (res.status === 200) {
				setLikes(res.data.likes);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const openPostModal = () => {};

	return (
		<>
			{showuser && (
				<Container>
					<Link className='tooltip' to={`/profile/${showuser._id}`}>
						<UserInfo>
							<span className='tooltiptext'>View Profile</span>
							<UserImage src={showuser.profilePicture}></UserImage>
							<p>{showuser.username}</p>
						</UserInfo>
					</Link>
					<p className='ml-2'>
						{description.length > 50
							? image.length !== 0
								? `${description.slice(0, 50)} ...view more`
								: description
							: description}
					</p>
					{/[a-zA-Z]/g.test(image) && (
						<PostImage
							onClick={openPostModal}
							src={image}
							alt='user'
						></PostImage>
					)}

					<LikesComments>
						<div
							className='flex items-center cursor-pointer'
							onClick={handleLike}
						>
							<LikeLogo>
								<HiThumbUp className='w-8 h-8 p-1' />
							</LikeLogo>
							<p>{likesNumber} Likes</p>
						</div>
						<p onClick={openPostModal} className='mr-2'>
							{comments} Comments
						</p>
					</LikesComments>
				</Container>
			)}
		</>
	);
}

export default PostItem;
