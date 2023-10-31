import AppRouter from "./routing/AppRouter";
import Header from "./components/Header/Header";
import { AuthProvider } from "./context/AuthProvider";

export default function App() {
    return (
        <AuthProvider>
            <AppRouter>
                <Header/>
            </AppRouter>
        </AuthProvider>
    );
}
