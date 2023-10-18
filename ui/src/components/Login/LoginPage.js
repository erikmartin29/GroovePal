import { Box, Stack, Input, InputLabel, Button, Typography } from "@mui/material";

import { blue } from '@mui/material/colors';
import { Fragment, useState } from "react";

export default function LoginPage(props) {

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const { handler } = props;

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
                    onClick={() => handler({user_id: username, user_pass: password })}
                >Login</Button>
                <Button 
                    variant="contained" 
                    sx={{ mt: 2, mb: 3 }}
                >Sign Up</Button>
            </Stack>
        </Box>
        </Fragment>
    );
}
