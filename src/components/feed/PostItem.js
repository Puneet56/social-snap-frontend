import React, { useEffect, useState } from 'react';
import { HiThumbUp } from 'react-icons/hi';
import axios from 'axios';

import tw from 'tailwind-styled-components';

const Conatiner = tw.div`max-h-[70vh] m-4 shadow-2xl w-[90%] rounded-xl bg-fbnav flex flex-col items-start justify-between
`;
const UserInfo = tw.div`w-full h-16 p-1 flex items-center justify-start
`;
const UserImage = tw.img`h-[80%] rounded-full bg-fbhover mx-2	 object-cover  
`;
const PostImage = tw.img`h-[70%] w-full bg-fbhover object-contain drop-shadow-lg
`;
const LikesComments = tw.div`w-full h-16 flex items-center justify-between
`;
const LikeLogo = tw.div`mx-2 bg-gradient-to-b from-[#17a8fd] to-[#046ce4] text-white rounded-full flex items-center justify-center
`;

const url = process.env.REACT_APP_URL;

function PostItem({ post }) {
	const { userId, image, likes, comments, description } = post;
	const [user, setUser] = useState();

	console.log(userId);

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

	console.log(user);

	return (
		<Conatiner>
			{user && (
				<UserInfo>
					<UserImage src={user.profilePicture}></UserImage>
					<p>{user.username}</p>
				</UserInfo>
			)}
			<p className='ml-2'>
				{description.length > 50
					? image.length !== 0
						? `${description.slice(0, 50)} ...view more`
						: description
					: description}
			</p>
			{/[a-zA-Z]/g.test(image) && (
				<PostImage src={image} alt={user}></PostImage>
			)}

			<LikesComments>
				<div className='flex items-center'>
					<LikeLogo>
						<HiThumbUp className='w-8 h-8 p-1' />
					</LikeLogo>
					<p>{likes} Likes</p>
				</div>
				<p className='mr-2'>{comments} Comments</p>
			</LikesComments>
		</Conatiner>
	);
}

export default PostItem;
