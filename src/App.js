import './styles/index.css';
import tw from 'tailwind-styled-components';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Navbar from './components/navigation/Navbar';
import PrivateRoute from './components/PrivateRoute';

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
					<PrivateRoute path='/'>
						<Navbar />
						<Switch>
							<PrivateRoute exact path='/'>
								<Home />
							</PrivateRoute>
							<PrivateRoute exact path='/friends'>
								<Friends />
							</PrivateRoute>
							<PrivateRoute exact path='/notifications'>
								<Notifications />
							</PrivateRoute>
							<PrivateRoute path={`/profile/:userid`}>
								<Profile />
							</PrivateRoute>
							<PrivateRoute exact path='/settings'>
								<Settings />
							</PrivateRoute>
						</Switch>
					</PrivateRoute>
				</Switch>
			</Router>
		</MainContainer>
	);
};

export default App;
