import { Box, Stack, Input, Button, Typography, ThemeProvider } from "@mui/material";
import { Fragment, useState } from "react";
import { AuthConsumer } from "../../context/AuthProvider";
import {
    Navigate,
    useLocation,
    useNavigate
} from 'react-router-dom';

import { darkGreen, lightGreen } from '../ColorPalette';

export default function LoginPage() {
    
    //Claire's Changes and Notes:
    //added a back button so a user can go back to the basic homepage
    
    // removed the old homepage, moved /home to /

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const { login, authed } = AuthConsumer();

    let navigate = useNavigate();
    let location = useLocation();
    let { from } = location.state || { from: {pathname: "/" }};

    const loginHandler = (payload) => {
        login(payload).then(() => {
            navigate(from, {replace: true});
        });
    }

    // rediect away from login if already signed in
    return authed ? <Navigate to={from} replace /> : (
        <Fragment>
        <Box sx={{
            bgcolor: '#353939',
            border: 1,
            borderColor: '#353939',
            height: 900
        }}>
        <Box>
            <Typography component='h1' 
                sx={{ 
                    margin: 'auto', 
                    mt: 10, 
                    alignItems: 'center', 
                    textAlign: 'center',
                    fontSize: '32px',
                    color: 'white'
                }}
            >
                Vinyl Scrobbler
            </Typography>
        </Box>
        <Box sx={{ 
            margin: 'auto', 
            mt: 10,
            padding: 5, 
            width: 200,
            alignItems: 'center', 
            borderWidth: 1, 
            borderStyle: 'solid',
            borderRadius: '10px', 
            borderColor: 'black',
            boxShadow: 8,
            bgcolor: '#e6e2d3'
        }}>
            <Stack>
                <Input
                    
                    placeholder="username"
                    sx={{ margin: 2 }}
                    required={true}
                    onChange={ event => setUsername(event.target.value) }     
                />
                <Input 
                    placeholder="password" 
                    type="password"
                    sx={{ margin: 2 }}
                    required={true}
                    onChange={ event => setPassword(event.target.value) }
                />
                <ThemeProvider theme={darkGreen}>
                <Button
                    sx={{
                        bgcolor: '#618343',
                        color: 'black',
                        mt: 3,
                        mb: 0
                    }}
                    variant="contained"
                    color="darkGreen"
                    onClick={() => loginHandler({ user_id: username, user_pass: password })}
                >
                    Login
                </Button>
                </ThemeProvider>
                <ThemeProvider theme={lightGreen}>
                <Button
                    sx={{
                        bgcolor: '#82B74B',
                        color: 'black',
                        mt: 2,
                        mb: 3
                    }}
                    variant="contained"
                    color="lightGreen"
                    onClick={() => navigate('/signup', {replace: true})}
                >
                    Sign Up
                </Button>
                </ThemeProvider>
                <Button
                    sx={{
                        color: 'black',
                        fontWeight: 'bold'
                    }}
                    onClick={() => navigate('/', {replace:true})}
                >
                    Back
                </Button>
            </Stack>
        </Box>
        </Box>
        </Fragment>
    );
}
