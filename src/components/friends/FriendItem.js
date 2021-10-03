import React from 'react';
import tw from 'tailwind-styled-components';

const Container = tw.div`w-[10rem] h-[10rem] m-4 bg-fbnav flex items-center justify-center flex-col rounded-xl overflow-hidden
`;
const ImageDiv = tw.div`h-3/4 bg-fbhover w-full
`;

function FriendItem({ friend }) {
	const { name, image } = friend;

	return (
		<Container>
			<ImageDiv>
				<img src={image} alt='friend' className='h-full w-full m-auto'></img>
			</ImageDiv>
			<p className='w-full text-center h-1/4 flex items-center justify-center'>
				{name}
			</p>
		</Container>
	);
}

export default FriendItem;
