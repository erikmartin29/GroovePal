import { Outlet, Navigate } from "react-router-dom";
import { AuthConsumer } from "../context/AuthProvider";

export default function ProtectedRoute() {
    const { authed } = AuthConsumer();
    return authed ? <Outlet /> : <Navigate to='/login' replace />
}

