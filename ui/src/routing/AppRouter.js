// Routing and Auth Protection
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import SignUp from "../components/SignUp/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../components/Login/LoginPage";

export default function AppRouter({children}) {
    return (
        <Router>
            {children}
            <Routes>
                <Route exact path='/' element={<ProtectedRoute/>}>
                    <Route exact path='/' element={<Main/>} />
                </Route>
                <Route exact path="/login" element={<LoginPage/>} />
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </Router>
    );
}

// placeholder for main component
function Main() {

    return (
        <h1>home - this is a protected page</h1>
    )
}

