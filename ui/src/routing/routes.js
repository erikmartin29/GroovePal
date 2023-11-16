import SignUp from "../components/SignUp/SignUp";
import LoginPage from "../components/Login/LoginPage";
import UserHome from '../components/HomePage/UserHome';
import CollectionPage from '../components/CollectionPage';
import ProfilePage from '../components/ProfilePage';
import Settings from '../components/Settings';
import PlayPage from '../components/PlayPage';

const routes = [
    {
        href: '/',
        component: <UserHome />,
        protected: true,
    },
    {
        href: '/login',
        component: <LoginPage />,
        protected: false,
    },
    {
        href: '/signup',
        component: <SignUp />,
        protected: false,
    },
    {
        href: '/collection',
        component: <CollectionPage />,
        protected: true,
    },
    {
        href: '/profile',
        component: <ProfilePage />,
        protected: true,
    },
    {
        href: '/settings',
        component: <Settings />,
        protected: true,
    },
    {
        href: '/play/:albumID',
        component: <PlayPage />,
        protected: true,
    }
];

export {
    routes 
};
