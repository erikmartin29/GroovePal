import AppRouter from "./routing/AppRouter";
import Header from "./components/Header/Header";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "@mui/material";

export default function App() {
    return (
        <AuthProvider>
            
                <AppRouter>
                    <Header/>
                </AppRouter>
            
        </AuthProvider>
    );
}
