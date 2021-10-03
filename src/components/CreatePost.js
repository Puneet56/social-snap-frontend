import React from 'react';
import tw from 'tailwind-styled-components';
import { MdPhotoLibrary } from 'react-icons/md';
import { BiHappyAlt } from 'react-icons/bi';

const Container = tw.div`mx-auto max-w-2xl my-3 rounded-2xl w-11/12 min-h-[20vh] bg-fbnav flex flex-col 
`;
const InputDiv = tw.div`flex items-center justify-start m-4
`;
const UserImage = tw.img`w-[11%] h-[80%] rounded-full m-2 bg-fbhover p-1 object-cover
`;
const SearchInput = tw.input`h-9 text-gray-300 rounded-full pl-3 w-10/12 outline-none transform transition-all duration-200 bg-fbhover input-cursor border-4 border-solid border-gray-400 border-opacity-50 box-content
`;
const BouttonsDiv = tw.div`flex items-center justify-center hover:bg-fbhover p-3 py-2 rounded-lg cursor-pointer
`;

function CreatePost() {
	return (
		<Container>
			<InputDiv>
				<UserImage src='https://avatars.dicebear.com/api/gridy/tester3.svg'></UserImage>
				<SearchInput
					id='search'
					type='text'
					placeholder={`What's on Your Mind?`}
				/>
			</InputDiv>
			<div className='w-11/12 border-b rounded-lg mx-auto border-fbhover'></div>
			<div className='w-full flex h-[42%] items-center justify-evenly'>
				<BouttonsDiv>
					<MdPhotoLibrary className='text-green-500 w-8 h-8 mr-2' />
					<p>Photo/Video</p>
				</BouttonsDiv>
				<BouttonsDiv>
					<BiHappyAlt className='text-yellow-500 w-8 h-8 mr-2' />
					<p>Feeling/Activity</p>
				</BouttonsDiv>
			</div>
		</Container>
	);
}

export default CreatePost;
