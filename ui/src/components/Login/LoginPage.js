import { Box, Stack, Input, Button, Typography } from "@mui/material";

import { blue } from '@mui/material/colors';
import { Fragment, useContext, useState } from "react";
import { UserContext, UserDispatchContext } from "../../context/UserProvider";
import { postAuth } from "../../utils/api_provider/api_provider";

import {
    useLocation,
    useNavigate
} from 'react-router-dom';

export default function LoginPage() {

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loginError, setLogginError ] = useState(null);

    const setUserDetails = useContext(UserDispatchContext);

    let navigate = useNavigate();
    let location = useLocation();
    let { from } = location.state || { from: {pathname: "/" }};

    const loginHandler = (payload) => {
        postAuth(payload)
            .then( res => res.data.user.user_id )
            .then( uid => setUserDetails({ user_id: uid }))
            .catch( error => {
                console.log(error)
                setLogginError(error);
                alert(error);
            })
            .finally(() => {
                navigate(from, {replace: true});
            });
    }

    const signUpNav = () => {
        navigate('/signup', {replace: true});
    }

    return (
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
                    onClick={signUpNav}
                >Sign Up</Button>
            </Stack>
        </Box>
        </Fragment>
    );
}
