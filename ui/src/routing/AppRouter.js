// Routing and Auth Protection
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import SignUp from "../components/SignUp/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../components/Login/LoginPage";
import HomePage from '../components/HomePage/HomePage';

export default function AppRouter({children}) {
    return (
        <Router>
            {children}
            <Routes>
                <Route exact path='/' element={<ProtectedRoute/>}>
                    <Route exact path='/' element={<HomePage/>} />
                </Route>
                <Route exact path="/login" element={<LoginPage/>} />
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </Router>
    );
}


