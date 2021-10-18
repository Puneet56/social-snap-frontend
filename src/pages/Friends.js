import axios from 'axios';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import FriendItem from '../components/friends/FriendItem';

const FriendList = tw.div`flex items-center justify-start flex-wrap max-w-3xl mx-auto overflow-y-auto overflow-x-hidden max-h-[90%]
`;

const url = process.env.REACT_APP_URL;

function Friends() {
	const [friends, setFreinds] = useState([]);

	useEffect(() => {
		const getAllUsers = async () => {
			try {
				const res = await axios.get(url + '/api/users/all');
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
	}, []);

	return (
		<FriendList>
			{friends.map((friend) => (
				<FriendItem friend={friend} key={friend._id} />
			))}
		</FriendList>
	);
}

export default Friends;
