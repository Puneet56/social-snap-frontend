import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';
import { Link } from 'react-router-dom';
import TimesAgo from 'react-timesago';
import { HiThumbUp } from 'react-icons/hi';
import CommentSection from '../feed/CommentSection';

const Container = tw.div`relative md:w-3/5 w-11/12 max-h-[90vh] flex flex-col items-start text-gray-100 rounded-3xl bg-fbnav p-4 space-y-3 overflow-auto
`;

const UserInfo = tw.div`w-full h-[4.3rem] p-1 flex items-center justify-start
`;
const UserImage = tw.img`h-[80%] rounded-full bg-fbhover mx-2	object-cover  
`;
const PostImage = tw.img`w-full bg-fbhover object-contain drop-shadow-lg
`;
const LikesComments = tw.div`w-full h-16 flex items-center justify-between
`;
const LikeLogo = tw.div`mx-2 bg-gradient-to-b from-[#17a8fd] to-[#046ce4] text-white rounded-full flex items-center justify-center
`;

function ViewPost({ showuser, handleLike, post, liking, likesNumber }) {
	const { image, comments, description, createdAt } = post;
	console.log(post);
	return (
		<Container onClick={(e) => e.stopPropagation()}>
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
			<p className='ml-2'>{description}</p>
			{/[a-zA-Z]/g.test(image) && (
				<PostImage src={image} alt='user'></PostImage>
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
						<p>{likesNumber} Likes</p>
					</div>
				)}
				<p className='mr-2'>{comments} Comments</p>
			</LikesComments>
			<p>Add Comment</p>
			<CommentSection comments={comments} />
		</Container>
	);
}

export default ViewPost;
