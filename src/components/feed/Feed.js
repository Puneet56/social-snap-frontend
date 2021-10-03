import React from 'react';
import tw from 'tailwind-styled-components';
import Posts from './Posts';

const Container = tw.div`w-full h-full max-w-lg mx-auto
`;

function Feed() {
	return (
		<Container>
			<Posts home />
		</Container>
	);
}

export default Feed;
