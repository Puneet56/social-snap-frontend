import React from 'react';
import tw from 'tailwind-styled-components';
import FollowButton from './FollowButton';
import TimesAgo from 'react-timesago';

const Info = tw.div`w-11/12 flex flex-col items-center justify-start my-3 max-w-lg p-3 bg-fbnav rounded-xl
`;

const InfoBlock = tw.div`w-full h-8 text-center flex items-center justify-center
`;

function UserInfo({ user }) {
	const { username, hometown, followers, following, createdAt } = user;
	return (
		<>
			<Info>
				<InfoBlock>{username}</InfoBlock>
				<FollowButton showuser={user} />
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
