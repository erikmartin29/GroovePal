import SignUp from "../components/SignUp/SignUp";
import LoginPage from "../components/Login/LoginPage";
import HomePage from '../components/HomePage/HomePage';
import DiscogsImportTest from "../components/Test Components/DiscogsImportTest";
import SettingsPage from "../components/Settings/SettingsPage";

const routes = [
    {
        href: '/',
        component: <HomePage />,
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
        href: '/discogs-test',
        component: <DiscogsImportTest />,
        protected: false,
    },
    {
        href: '/settings',
        component: <SettingsPage />,
        protected: true,
    },
];

export {
    routes 
};
