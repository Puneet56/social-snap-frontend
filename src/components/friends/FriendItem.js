import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Container = tw.div`w-[10rem] h-[10rem] m-4 bg-fbnav flex items-center justify-center flex-col rounded-xl overflow-hidden
`;
const ImageDiv = tw.div`h-3/4 bg-fbhover w-full
`;

const url = process.env.REACT_APP_URL;

function FriendItem({ id }) {
	const [user, setUser] = useState({});
	const { token } = useAuth();

	useEffect(() => {
		const getUserdetails = async () => {
			try {
				const fetchedUser = await axios.get(url + `/api/users/${id}`, {
					headers: { Authorization: `${token}` },
				});
				setUser(fetchedUser.data);
			} catch (error) {
				console.log(error);
			}
		};
		getUserdetails();
	}, [id, token]);

	return (
		<Link to={`/profile/${user._id}`}>
			<Container>
				<ImageDiv>
					<img
						src={user.profilePicture}
						alt='friend'
						className='h-full mx-auto'
					></img>
				</ImageDiv>
				<p className='w-full text-center h-1/4 flex items-center justify-center'>
					{user.username}
				</p>
			</Container>
		</Link>
	);
}

export default FriendItem;
