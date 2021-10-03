import React from 'react';
import tw from 'tailwind-styled-components';
import { HiThumbUp } from 'react-icons/hi';

const Container = tw.div`w-full h-[70vh] bg-fbnav my-5 rounded-2xl mx-auto shadow-2xl
`;
const UserInfo = tw.div`w-full h-[12.5%] p-1 flex items-center justify-start
`;
const UserImage = tw.img`h-[80%] rounded-full bg-fbhover mx-2	 object-cover  
`;
const PostImage = tw.img`h-[70%] w-full bg-fbhover object-contain drop-shadow-lg
`;
const LikesComments = tw.div`w-full h-[12.5%] flex items-center justify-between
`;
const LikeLogo = tw.div`mx-2 bg-gradient-to-b from-[#17a8fd] to-[#046ce4] text-white rounded-full flex items-center justify-center
`;

function UserPost({ post }) {
	const { user, image, likes, comments, description } = post;

	return (
		<Container>
			<UserInfo>
				<UserImage src='https://avatars.dicebear.com/api/gridy/tester3.svg'></UserImage>
				<p>{user}</p>
			</UserInfo>
			<p className='ml-2'>
				{description.length > 50
					? image.length !== 0
						? `${description.slice(0, 50)} ...view more`
						: description
					: description}
			</p>
			{image.length !== 0 && <PostImage src={image} alt={user}></PostImage>}

			<LikesComments>
				<div className='flex items-center'>
					<LikeLogo>
						<HiThumbUp className='w-8 h-8 p-1' />
					</LikeLogo>
					<p>{likes} Likes</p>
				</div>
				<p className='mr-2'>{comments} Comments</p>
			</LikesComments>
		</Container>
	);
}

export default UserPost;
