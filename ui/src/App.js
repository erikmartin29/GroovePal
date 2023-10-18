import { Fragment, useState } from "react";

import LoginPage from "./components/Login/LoginPage";
import Header from "./components/Header/Header";

import { postAuth } from "./utils/api_provider/api_provider";

import {
    BrowserRouter as Router,
//   Switch,
    Route,
    Routes,
//    useParams,
//   useNavigate
} from 'react-router-dom';

export default function App() {

    const [ activeUser, setActiveUser ] = useState(undefined);    

    const handleLogin = (payload) => {
        postAuth(payload).then( res => {
            console.log(res);
            return res.data.user.user_id;
        })
        .then( uid => {
            console.log(uid)
            setActiveUser(uid)
        })
        .catch( error => console.log(error) )
    }

    return (
        <Fragment>
        {activeUser !== undefined ? 
            <Header activeUser={activeUser} />
            : 
            <LoginPage handler={handleLogin} />}
        </Fragment>
    );
}

function MainRouter() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<></>} />
            </Routes>
        </Router>
    );

}
