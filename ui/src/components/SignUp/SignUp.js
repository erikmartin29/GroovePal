import { Fragment, useState } from 'react';
import { Box, TextField, Typography, Button, Stack, Input, ThemeProvider } from "@mui/material";
import { blue } from '@mui/material/colors';

import { authenticateLastFM, signUp, validUsername } from '../../utils/api_provider/api_provider';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    //Claire's Changes and Notes:
    //made the format look like the login page for uniformity, and added a back button to return to the basic homepage

    const [newAccount, setNewAccount] = useState({});
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (newAccount.user_id === undefined || newAccount.user_pass === undefined ||
            newAccount.user_fname === undefined || newAccount.user_lname === undefined ||
            newAccount.user_pass_confirm === undefined) {
            alert("Please provide a value for each field");
            return;
        }

        if (newAccount.user_pass !== newAccount.user_pass_confirm) {
            alert("Passwords do not match");
            return;
        }

        //we can remove the passwordConfirm field from the newAccount object, since it won't need to be in the database.
        delete newAccount.user_pass_confirm;

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
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
            .finally(() => {
                navigate('/', { replace: true })
            });
    };

    return (
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
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 0, width: '25ch', p: 0 }
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <Stack alignItems='center'>
                            <Input
                                placeholder="Username"
                                sx={{ margin: 2, width: 180, color: 'white',
                        // underline when selected
                        ':after': { borderBottomColor: 'white' } }}
                                required={true}
                                onChange={e => setNewAccount({ ...newAccount, user_id: e.target.value })}
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                sx={{ margin: 2, width: 180, color: 'white',
                        // underline when selected
                        ':after': { borderBottomColor: 'white' } }}
                                required={true}
                                onChange={e => setNewAccount({ ...newAccount, user_pass: e.target.value })}
                            />
                            <Input
                                placeholder="Confirm Password"
                                type="password"
                                sx={{ margin: 2, width: 180, color: 'white',
                        // underline when selected
                        ':after': { borderBottomColor: 'white' } }}
                                required={true}
                                onChange={e => setNewAccount({ ...newAccount, user_pass_confirm: e.target.value })}
                            />
                            <Input
                                placeholder="First Name"
                                sx={{ margin: 2, width: 180, color: 'white',
                        // underline when selected
                        ':after': { borderBottomColor: 'white' } }}
                                required={true}
                                onChange={e => setNewAccount({ ...newAccount, user_fname: e.target.value })}
                            />
                            <Input
                                placeholder="Last Name"
                                sx={{ margin: 2, width: 180, color: 'white',
                        // underline when selected
                        ':after': { borderBottomColor: 'white' } }}
                                required={true}
                                onChange={e => setNewAccount({ ...newAccount, user_lname: e.target.value })}
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
                                type='submit'
                                variant='contained'
                            >
                                Create Account
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
                                //type='submit'
                                variant='contained'
                                onClick={() => navigate('/', { replace: true })}
                            >
                                Back To Log In
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
}
