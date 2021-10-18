import React from 'react';
import tw from 'tailwind-styled-components';
import FollowButton from './FollowButton';
import TimesAgo from 'react-timesago';

const Info = tw.div`w-11/12 flex flex-col items-center justify-start my-3 max-w-lg h-[25vh] bg-fbnav rounded-xl
`;

const InfoBlock = tw.div`w-full h-1/5 text-center flex items-center justify-center
`;

function UserInfo({ user }) {
	const { username, hometown, followers, following, createdAt } = user;
	return (
		<>
			<Info>
				<InfoBlock>{username}</InfoBlock>
				<FollowButton />
				<InfoBlock>
					{followers && followers.length} Followers{' '}
					{following && following.length} Followers
				</InfoBlock>
				<InfoBlock>From {hometown}</InfoBlock>
				<InfoBlock>
					Joined{' '}
					{createdAt && (
						<TimesAgo time={createdAt} type='default' suffix='ago' />
					)}
				</InfoBlock>
			</Info>
		</>
	);
}

export default UserInfo;
