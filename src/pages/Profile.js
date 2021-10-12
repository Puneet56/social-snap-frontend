import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import tw from 'tailwind-styled-components';
import axios from 'axios';
import PostItem from '../components/feed/PostItem';
import Loader from '../components/loader/Loader';

// const POSTS = [
// 	{
// 		id: 1,
// 		user: 'User 1',
// 		description:
// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula egestas lorem sit amet sodales. Sed gravida odio egestas vehicula feugiat. Ut eu est tortor. Vivamus pharetra, quam ut aliquet gravida, sem quam bibendum est, ut vehicula sem ex ac arcu. Praesent rutrum libero sit amet vulputate ullamcorper. Maecenas interdum at lectus in rutrum. Cras nisi eros, rutrum quis maximus.',
// 		image: 'https://source.unsplash.com/800x600/?mountains',
// 		likes: 5,
// 		comments: 4,
// 	},
// 	{
// 		id: 2,
// 		user: 'User 2',
// 		description:
// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula egestas lorem sit amet sodales. Sed gravida odio egestas vehicula feugiat. Ut eu est tortor. Vivamus pharetra, quam ut aliquet gravida, sem quam bibendum est, ut vehicula sem ex ac arcu. Praesent rutrum libero sit amet vulputate ullamcorper. Maecenas interdum at lectus in rutrum. Cras nisi eros, rutrum quis maximus.',
// 		image: 'https://source.unsplash.com/400x600/?mountains',
// 		likes: 5,
// 		comments: 4,
// 	},
// 	{
// 		id: 3,
// 		user: 'User 3',
// 		description:
// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula egestas lorem sit amet sodales. Sed gravida odio egestas vehicula feugiat. Ut eu est tortor. Vivamus pharetra, quam ut aliquet gravida, sem quam bibendum est, ut vehicula sem ex ac arcu. Praesent rutrum libero sit amet vulputate ullamcorper. Maecenas interdum at lectus in rutrum. Cras nisi eros, rutrum quis maximus.',
// 		image: 'https://source.unsplash.com/400x600/?mountains',
// 		likes: 5,
// 		comments: 4,
// 	},
// 	{
// 		id: 4,
// 		user: 'User 4',
// 		description:
// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula egestas lorem sit amet sodales. Sed gravida odio egestas vehicula feugiat. Ut eu est tortor. Vivamus pharetra, quam ut aliquet gravida, sem quam bibendum est, ut vehicula sem ex ac arcu. Praesent rutrum libero sit amet vulputate ullamcorper. Maecenas interdum at lectus in rutrum. Cras nisi eros, rutrum quis maximus.',
// 		image: 'https://source.unsplash.com/400x600/?mountains',
// 		likes: 5,
// 		comments: 4,
// 	},
// ];

const Container = tw.div`w-full max-h-full max-w-2xl mx-auto overflow-y-auto
`;
const CoverPhoto = tw.div`w-full mt-4 h-[30vh] object-fill object-center bg-green-500 rounded-2xl
`;
const UserImage = tw.div`overflow-hidden rounded-full w-48 h-48 bg-yellow-400 origin-center -mt-24 ml-[calc(50%-6rem)] object-contain object-center
`;

const url = process.env.REACT_APP_URL;

function Profile() {
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const [showuser, setshowUser] = useState([]);

	const params = useParams();

	console.log(params);

	useEffect(() => {
		setLoading(true);
		const getUserdetails = async () => {
			try {
				const fetchedUser = await axios.get(
					url + `/api/users/614d7b63e842ab0c54eb6746`
				);
				setshowUser(fetchedUser.data);
			} catch (error) {
				console.log(error);
			}
		};

		const getPosts = async () => {
			try {
				const fetchedposts = await axios.get(
					url + `/api/posts/posts/614d7b63e842ab0c54eb6746`
				);
				setPosts(fetchedposts.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		getUserdetails();
		getPosts();
	}, []);

	return (
		<Container>
			{loading && <Loader />}
			<CoverPhoto>
				<img src={showuser.CoverPhoto} alt='cover'></img>
			</CoverPhoto>
			<UserImage>
				<img
					src={showuser.profilePicture}
					alt='user'
					className='w-full h-full'
				></img>
			</UserImage>
			<div className='w-full max-w-lg mx-auto mb-28'>
				{posts.map((post) => (
					<PostItem post={post} key={post._id} />
				))}
			</div>
		</Container>
	);
}

export default Profile;
