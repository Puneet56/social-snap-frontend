import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import CreatePost from '../CreatePost';
import PostItem from './PostItem';
import axios from 'axios';

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

const Container = tw.div`w-full h-[90%] overflow-x-hidden overflow-y-auto flex flex-col items-center justify-start mb-96
`;
const url = process.env.REACT_APP_URL;

function Posts(props) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			try {
				const fetchedposts = await axios.get(
					url + `/api/posts/timeline/614d7b76e842ab0c54eb6748`
				);
				setPosts(fetchedposts.data);
			} catch (error) {
				console.log(error);
			}
		};
		getPosts();
	}, []);

	return (
		<>
			<Container>
				{props.home && <CreatePost />}
				{posts.map((post) => (
					<PostItem post={post} key={post._id} />
				))}
			</Container>
		</>
	);
}

export default Posts;
