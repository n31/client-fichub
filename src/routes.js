import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import Profile from './components/Profile';

const routes = [
	{
		path: '/',
		exact: true,
		component: Home
	},
	{
		path: '/login',
		component: SignIn
	},
	{
		path: '/registration',
		component: SignUp
	},
	//{
	//	path: '/profile',
	//	component: Profile
	//},
	{
		path: '*',
		restricted: false,
		component: Profile
	}
]

export default routes;