import Profile from './components/Profile.vue';
import Developer from './components/Developer.vue';
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
		path: '/developer',
		component: Developer
	},
	{
		path: '/users',
		component: Users
	}
]