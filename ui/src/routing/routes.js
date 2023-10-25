import SignUp from "../components/SignUp/SignUp";
import LoginPage from "../components/Login/LoginPage";
import HomePage from '../components/HomePage/HomePage';

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
    }
];

export {
    routes 
};
