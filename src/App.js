import './styles/index.css';
import tw from 'tailwind-styled-components';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Navbar from './components/navigation/Navbar';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const MainContainer = tw.div`absolute left-0 right-0 top-0 bottom-0 bg-fbbg text-gray-300 overflow-hidden
`;

const App = () => {
	return (
		<MainContainer>
			<Router>
				<Switch>
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={SignUp} />
					<Route path='/'>
						<Navbar />
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/friends' component={Friends} />
							<Route exact path='/notifications' component={Notifications} />
							<Route exact path='/profile' component={Profile} />
							<Route exact path='/settings' component={Settings} />
						</Switch>
					</Route>
				</Switch>
			</Router>
		</MainContainer>
	);
};

export default App;
