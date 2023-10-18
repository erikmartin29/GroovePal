import { Fragment, useContext, useState } from "react";

import LoginPage from "./components/Login/LoginPage";
import Header from "./components/Header/Header";

import { UserContext, UserDispatchContext } from "./context/UserProvider";

export default function App() {

    const userDetails = useContext(UserContext);

    return (
        <Fragment>
            { userDetails.user_id === undefined ?
                <LoginPage />
                : 
                <Main />}
        </Fragment>
    );
}

function Main() {

    return (
        <Header />
    )
}
