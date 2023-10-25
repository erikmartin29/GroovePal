import { Box, Stack, Input, Button, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { AuthConsumer } from "../../context/AuthProvider";
import { blue } from '@mui/material/colors';
import {
    Navigate,
    useLocation,
    useNavigate
} from 'react-router-dom';

export default function LoginPage() {

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
        <Box>
            <Typography component='h1' 
                sx={{ 
                    margin: 'auto', 
                    mt: 10, 
                    alignItems: 'center', 
                    textAlign: 'center',
                    fontSize: '32px'
                }}
            >Vinyl Scrobbler</Typography>
        </Box>
        <Box sx={{ 
            margin: 'auto', 
            mt: 10,
            padding: 5, 
            width: 200,
            height: 250, 
            alignItems: 'center', 
            borderWidth: 1, 
            borderStyle: 'solid',
            borderRadius: '10px', 
            borderColor: blue[500] 
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
                    variant="contained" 
                    sx={{ mt: 3, mb: 0 }}
                    onClick={() => loginHandler({ user_id: username, user_pass: password })}
                >Login</Button>
                <Button 
                    variant="contained" 
                    sx={{ mt: 2, mb: 3 }}
                    onClick={() => navigate('/signup', {replace: true})}
                >Sign Up</Button>
            </Stack>
        </Box>
        </Fragment>
    );
}
