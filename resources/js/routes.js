import Profile from './components/Profile.vue';
import Dashboard from './components/Dashboard.vue';
import Users from './components/Users.vue';


export default [
	{
		path: '/dashboard',
		component: Dashboard
	},
	{
		path: '/profile',
		component: Profile
	},
	{
		path: '/users',
		component: Users
	}
]