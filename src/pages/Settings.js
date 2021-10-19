import React from 'react';
import SignOut from '../components/settings/SignOut';
import tw from 'tailwind-styled-components';
import EditDetails from '../components/settings/EditDetails';

const Container = tw.div`w-full h-full max-w-lg mx-auto flex items-center justify-start flex-col overflow-auto 
`;

function Settings() {
	return (
		<Container>
			<SignOut />
			<EditDetails />
		</Container>
	);
}

export default Settings;
