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
            bgcolor: '#222222',
            border: 1,
            borderColor: '#222222',
            height: '100vh'
        }}>
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
            bgcolor: '#141414'
        }}>
            <Stack alignItems='center'>
                <Input
                    placeholder="Username"
                    sx={{ margin: 2, width: 180, color: 'white',
                        // underline when selected
                        ':after': { borderBottomColor: 'white' } }}
                    required={true}
                    onChange={ event => setUsername(event.target.value) }     
                />
                <Input 
                    placeholder="Password" 
                    type="password"
                    sx={{ margin: 2, width: 180, color: 'white',
                        // underline when selected
                        ':after': { borderBottomColor: 'white' } }}
                    required={true}
                    onChange={ event => setPassword(event.target.value) }
                />
                <Button
                    sx={{
                        bgcolor: 'white',
                        color: 'black',
                        ':hover': {
                            bgcolor: 'black',
                            color: 'white',
                        },
                        mt: 3,
                        mb: 0,
                        width: 180
                    }}
                    variant="contained"
                    onClick={() => loginHandler({ user_id: username, user_pass: password })}
                >
                    Login
                </Button>
                <Button
                    sx={{
                        bgcolor: 'white',
                        color: 'black',
                        ':hover': {
                            bgcolor: 'black',
                            color: 'white',
                        },
                        mt: 3,
                        mb: 0,
                        width: 180
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
