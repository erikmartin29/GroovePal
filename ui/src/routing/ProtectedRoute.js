import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

export default function ProtectedRoute() {
    const userDetails = useContext(UserContext);

    return userDetails.user_id !== undefined ? <Outlet /> : <Navigate to="login"/>;

}

