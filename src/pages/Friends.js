import React from 'react';
import tw from 'tailwind-styled-components';
import FriendItem from '../components/friends/FriendItem';
const FRIENDS = [
	{
		id: 1,
		name: 'Friend 1',
		image: 'https://avatars.dicebear.com/api/gridy/friend.svg',
	},
	{
		id: 2,
		name: 'Friend 2',
		image: 'https://avatars.dicebear.com/api/gridy/friend.svg',
	},
	{
		id: 3,
		name: 'Friend 3',
		image: 'https://avatars.dicebear.com/api/gridy/friend.svg',
	},
	{
		id: 4,
		name: 'Friend 4',
		image: 'https://avatars.dicebear.com/api/gridy/friend.svg',
	},
];

const FriendList = tw.div`flex items-center justify-start flex-wrap max-w-3xl mx-auto overflow-y-auto overflow-x-hidden max-h-[90%]
`;

function Friends() {
	return (
		<FriendList>
			{FRIENDS.map((friend) => (
				<FriendItem friend={friend} key={friend.id} />
			))}
		</FriendList>
	);
}

export default Friends;
