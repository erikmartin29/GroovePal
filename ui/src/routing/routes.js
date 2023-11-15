import SignUp from "../components/SignUp/SignUp";
import LoginPage from "../components/Login/LoginPage";
import HomePage from '../components/HomePage/HomePage';
import UserHome from '../components/HomePage/UserHome';
import CollectionPage from '../components/CollectionPage';
import ProfilePage from '../components/ProfilePage';
import Settings from '../components/Settings';
import PlayPage from '../components/PlayPage';

const routes = [
    {
        href: '/',
        component: <HomePage />,
        protected: false,
    },
    {
        href: '/home',
        component: <UserHome />,
        protected: false,
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
        protected: false,
    },
    {
        href: '/profile',
        component: <ProfilePage />,
        protected: false,
    },
    {
        href: '/settings',
        component: <Settings />,
        protected: false,
    },
    {
        href: '/play/:albumID',
        component: <PlayPage />,
        protected: false,
    }
];

export {
    routes 
};
