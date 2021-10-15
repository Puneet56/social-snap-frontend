import React from 'react';
import tw from 'tailwind-styled-components';
import { NavLink } from 'react-router-dom';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { FaUserFriends, FaUser } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { useAuth } from '../../context/AuthContext';

const LogoDiv = tw.div`w-full max-w-3xl rounded-t-2xl mx-auto h-8 bg-fbnav flex items-center
`;
const LogoImg = tw.div`w-6 h-6 rounded-full overflow-hidden flex flex-col items-center justify-end bg-gradient-to-b from-[#17a8fd] to-[#046ce4] text-white
`;
const LogoText = tw.p`font-normal text-lg ml-2 text-white
`;
const NavigationBar = tw.nav`w-full max-w-3xl mx-auto rounded-b-2xl h-12 bg-fbnav flex items-center justify-evenly
`;
const NavItem = tw.div`w-[15%] h-4/5 flex items-center justify-center hover:bg-fbhover rounded-lg text-white 
`;

function Navbar() {
	const { user } = useAuth();
	return (
		<>
			<LogoDiv>
				<LogoImg></LogoImg>
				<LogoText>SocialSnap</LogoText>
			</LogoDiv>
			<NavigationBar>
				<NavItem>
					<NavLink
						to='/'
						className='h-4/6 w-4/6 transform transition-all ease-in-out duration-100'
						exact
						activeClassName='h-full flex items-center justify-center border-b-4 w-3/5 text-center border-solid border-[#046ce4]'
					>
						<AiFillHome className='mx-auto h-full w-full mb-3' />
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className='h-4/6 w-4/6 transform transition-all ease-in-out duration-100'
						exact
						activeClassName='h-full flex items-center justify-center border-b-4 w-3/5 text-center border-solid border-[#046ce4]'
						to={`/profile/${user._id}`}
					>
						<FaUser className='mx-auto h-5/6 w-5/6 mb-3' />
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className='h-4/6 w-4/6 transform transition-all ease-in-out duration-100'
						exact
						activeClassName='h-full flex items-center justify-center border-b-4 w-3/5 text-center border-solid border-[#046ce4]'
						to='friends'
					>
						<FaUserFriends className='mx-auto h-5/6 w-5/6 mb-3' />
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className='h-4/6 w-4/6 transform transition-all ease-in-out duration-100'
						exact
						activeClassName='h-full flex items-center justify-center border-b-4 w-3/5 text-center border-solid border-[#046ce4]'
						to='/notifications'
					>
						<IoMdNotifications className='mx-auto h-5/6 w-5/6 mb-3' />
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className='h-4/6 w-4/6 transform transition-all ease-in-out duration-100'
						exact
						activeClassName='h-full flex items-center justify-center border-b-4 w-3/5 text-center border-solid border-[#046ce4]'
						to='/settings'
					>
						<AiFillSetting className='mx-auto h-5/6 w-5/6 mb-3' />
					</NavLink>
				</NavItem>
			</NavigationBar>
		</>
	);
}

export default Navbar;
