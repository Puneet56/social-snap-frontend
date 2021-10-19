import React from 'react';
import tw from 'tailwind-styled-components';

const Button = tw.button`bg-red-500 min-w-[7rem] min-h-[4rem] text-white font-medium my-5
`;

function SignOut() {
	return <Button>SignOut</Button>;
}

export default SignOut;
