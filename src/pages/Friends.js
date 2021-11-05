import axios from 'axios';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import FriendItem from '../components/friends/FriendItem';
import { useAuth } from '../context/AuthContext';

const FriendList = tw.div`flex items-center justify-start flex-wrap max-w-3xl mx-auto
`;
const Heading = tw.div`w-full h-10 text-center bg-fbhover rounded-3xl mx-auto max-w-3xl mt-4 flex items-center justify-center
`;

const url = process.env.REACT_APP_URL;

function Friends() {
	const [friends, setFreinds] = useState([]);
	const { user, token } = useAuth();

	useEffect(() => {
		const getAllUsers = async () => {
			try {
				const res = await axios.get(url + '/api/users/all', {
					headers: { Authorization: `${token}` },
				});
				if (res.status === 200) {
					setFreinds(res.data);
				} else {
					console.log(res);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getAllUsers();
	}, [token]);

	return (
		<div className='w-full h-4/5 overflow-auto'>
			<Heading>Followers</Heading>
			<FriendList>
				{user.followers.map((friend) => (
					<FriendItem id={friend} key={friend} />
				))}
			</FriendList>
			<Heading>Following</Heading>
			<FriendList>
				{user.following.map((friend) => (
					<FriendItem id={friend} key={friend} />
				))}
			</FriendList>
			<Heading>All Users</Heading>
			<FriendList>
				{friends.map((friend) => (
					<FriendItem id={friend._id} key={friend._id} />
				))}
			</FriendList>
		</div>
	);
}

export default Friends;
