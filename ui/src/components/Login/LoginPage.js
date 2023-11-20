import { Box, Stack, Input, Button, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { AuthConsumer } from "../../context/AuthProvider";
import {
    Navigate,
    useLocation,
    useNavigate
} from 'react-router-dom';

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
            height: '100vh'
        }}>
        <Box>
            <Typography component='h1' 
                sx={{ 
                    margin: 'auto', 
                    mt: 10, 
                    alignItems: 'center', 
                    textAlign: 'center',
                    fontSize: '32px',
                    color: '#ffffff'
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
            borderColor: '#000000',
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
                <Button
                    sx={{
                        bgcolor: '#141414',
                        color: 'white',
                        ':hover': {
                            bgcolor: '#333333',
                        },
                        mt: 3,
                        mb: 0
                    }}
                    variant="contained"
                    onClick={() => loginHandler({ user_id: username, user_pass: password })}
                >
                    Login
                </Button>
                <Button
                    sx={{
                        bgcolor: '#141414',
                        color: 'white',
                        ':hover': {
                            bgcolor: '#333333',
                        },
                        mt: 2,
                        mb: 3
                    }}
                    variant="contained"
                    //color="#82B74B"
                    onClick={() => navigate('/signup', {replace: true})}
                >
                    Sign Up
                </Button>
            </Stack>
        </Box>
        </Box>
        </Fragment>
    );
}
