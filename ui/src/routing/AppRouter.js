// Routing and Auth Protection
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import { routes } from './routes';

export default function AppRouter({children}) {

    return (
        <Router>
            {children}
            <Routes>
                {routes.map((route, idx) => (
                    <Route key={idx} path={route.href} element={
                        route.protected ? (
                            <ProtectedRoute>
                                {route.component}
                            </ProtectedRoute>
                        ) : (
                            route.component
                        )
                    } />
                ))}
            </Routes>
        </Router>
    );
}


