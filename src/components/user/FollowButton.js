import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import tw from 'tailwind-styled-components';

const Follow = tw.button`h-10 m-1 px-5 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none disabled:cursor-not-allowed
`;

const url = process.env.REACT_APP_URL;

function FollowButton({ showuser }) {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [isFollowing, setFollowing] = useState(
		user.following.includes(showuser._id)
	);

	const followHandler = async () => {
		if (isFollowing) {
			setLoading(true);
			try {
				const res = await axios.put(
					url + `/api/users/${showuser._id}/unfollow`,
					{ userId: user._id }
				);
				// dispatch({ type: 'UNFOLLOW', payload: showuser._id });
				if (res.status === 200) {
					setFollowing(false);
					setLoading(false);
				} else {
					console.log(res);
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		} else {
			setLoading(true);
			try {
				const res = await axios.put(url + `/api/users/${showuser._id}/follow`, {
					userId: user._id,
				});
				// dispatch({ type: 'FOLLOW', payload: showuser._id });
				if (res.status === 200) {
					setFollowing(true);
					setLoading(false);
				} else {
					console.log(res);
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		setFollowing(user.following.includes(showuser._id));
	}, [user, showuser]);

	return (
		<>
			{user._id !== showuser._id ? (
				<Follow onClick={followHandler} disabled={loading}>
					{isFollowing ? '- Unfollow' : '+ Follow'}
				</Follow>
			) : (
				<></>
			)}
		</>
	);
}

export default FollowButton;
