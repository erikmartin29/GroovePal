import { Navigate } from "react-router-dom";
import { AuthConsumer } from "../context/AuthProvider";

export default function ProtectedRoute({children}) {
    const { authed } = AuthConsumer();
    return authed ? children : <Navigate to='/' replace />
}

