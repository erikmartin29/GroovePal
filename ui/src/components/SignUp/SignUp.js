import { Fragment, useState } from 'react';
import { Box, TextField, Typography, Button, Stack, Input, ThemeProvider } from "@mui/material";
import { blue } from '@mui/material/colors';

import { authenticateLastFM, signUp, validUsername } from '../../utils/api_provider/api_provider';
import { useNavigate } from 'react-router-dom';

import { darkGreen, lightGreen } from '../ColorPalette';

export default function SignUp() {
    
    //Claire's Changes and Notes:
    //made the format look like the login page for uniformity, and added a back button to return to the basic homepage
    
    const [ newAccount, setNewAccount ] = useState({});
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if ( newAccount.user_id === undefined || newAccount.user_pass === undefined ||
             newAccount.user_fname === undefined || newAccount.user_lname === undefined) 
        {
            alert("Please provide a value for each field");
            return;
        }

        /*
        validUsername(newAccount.user_id).then( res => {
            console.log(res);
            if ( !res.data.valid ) {
                alert("User name is not available");
                return false;
            }
            return true;
        })
        .then( doSubmit => {
            if ( !doSubmit ) 
                return;
            signUp(newAccount).then(res => {
                console.log(res);
            })
            .catch( error => console.log(error) )
            .finally( () => {
                navigate("/", { replace: true });
            });
        })
        .catch( error => console.log(error) )
        */
        signUp(newAccount)
        .then( res => console.log(res.data) )
        .catch( error => console.log(error))
        .finally( () => {
            navigate('/', {replace: true})
        });
    };
    
    return (
            <Fragment>
            <Box sx={{
                height: 900,
                bgcolor: '#353939',
                border: 1,
                borderColor: '#353939'
            }}>
                <Box>
                    <Typography component="h1"
                        sx={{
                            margin: 'auto',
                            mt: 10,
                            alignItems: 'center',
                            textAlign: 'center',
                            fontSize: '32px',
                            color: 'white'
                        }}>
                            New Account
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
                bgcolor: '#e6e2d3',
                boxShadow: 8
            }}>
            <Box 
                component="form" 
                sx={{ 
                    '& .MuiTextField-root': { m: 1, width: '25ch', p: 0},
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Stack>
                    <Input
                        placeholder="username"
                        sx={{ magin: 2, mb: 2 }}
                        required={true}
                        onChange={ e => setNewAccount({ ...newAccount, user_id: e.target.value })}
                    />
                    <Input
                        placeholder="password"
                        type="password"
                        sx={{ mt: 2, mb: 2, width: '100%' }}
                        required={true}
                        onChange={ e => setNewAccount({ ...newAccount, user_pass: e.target.value })}
                    />
                    <Input
                        placeholder="firstname"
                        sx={{ mt: 2, mb: 2 }}
                        required={true}
                        onChange={ e => setNewAccount({ ...newAccount, user_fname: e.target.value })}
                    />
                    <Input
                        placeholder="lastname"
                        sx={{ mt: 2 }}
                        required={true}
                        onChange={ e => setNewAccount({ ...newAccount, user_lname: e.target.value })}
                    />
            <ThemeProvider theme={lightGreen}>
                    <Button
                        sx={{
                            mt: 3,
                            bgcolor: '#82B74B'
                        }}
                            type='submit'
                            variant='contained'
                            color="lightGreen"
                    >
                        Create
                    </Button>
            </ThemeProvider>
                    <Button
                        sx={{
                            color: 'black',
                            fontWeight: 'bold',
                            mt: 2,
                        }}
                        onClick={() => navigate('/', {replace:true})}
                    >
                        Back
                    </Button>
                </Stack>
            </Box>
        </Box>
            </Box>
        </Fragment>
    );
}
