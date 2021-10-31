import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';

const Container = tw.div`w-full h-full max-w-lg mx-auto flex flex-col items-center justify-start text-xl space-y-3
`;
const LinkTag = tw.a`text-blue-600 underline
`;
const Notifications = () => {
	return (
		<>
			<Container>
				<p>Hi, This Feature will be implemented Soon.</p>
				<p>
					Check out My other Projects at my{' '}
					<LinkTag href='https://www.puneetdhiman.com'>
						PortFolio Website
					</LinkTag>
				</p>
			</Container>
		</>
	);
};

export default Notifications;
