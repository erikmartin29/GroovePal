import { useState } from 'react';
import { Box, TextField, Typography, Button, Grid } from "@mui/material";

import { signUp, validUsername } from '../../utils/api_provider/api_provider';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
    
    const [ newAccount, setNewAccount ] = useState({});
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if ( newAccount.user_id === undefined || newAccount.user_pass === undefined ||
             newAccount.user_fname === undefined || newAccount.user_lname === undefined ) 
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
        <Box sx={{ margin: 'auto', alignItems: 'center', textAlign: 'center', display: 'inline-block'}}>
            <Typography component="h1" sx={{ fontSize: '23px', mt: '15px', width: 'auto'  }} >New Account</Typography>
            <Box 
                component="form" 
                sx={{ 
                    '& .MuiTextField-root': { m: 1, width: '25ch', p: 0},
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Grid container columns={2}>
                    <Grid item xs={2}>
                        <TextField 
                            require="true" 
                            id="user_id"  
                            type="text" 
                            label="Username" 
                            onChange={ e => setNewAccount({ ...newAccount, user_id: e.target.value })}
                        />    
                    </Grid>
                    <Grid item xs={2}>
                        <TextField 
                            require="true" 
                            id="user_pass" 
                            type="password" 
                            label="Password"
                            onChange={ e => setNewAccount({ ...newAccount, user_pass: e.target.value })}
                        />    
                    </Grid>
                    <Grid item xs={2}>
                        <TextField 
                            require="true" 
                            id="user_fname" 
                            type="text" 
                            label="Firstname" 
                            onChange={ e => setNewAccount({ ...newAccount, user_fname: e.target.value })}
                        />    
                    </Grid>
                    <Grid item xs={2}>
                        <TextField 
                            require="true" 
                            id="user_lname" 
                            type="text" 
                            label="Lastname" 
                            onChange={ e => setNewAccount({ ...newAccount, user_lname: e.target.value })}
                        />    
                    </Grid>
                    <Grid item xs={2}>
                        <Button type='submit' variant='contained'>Create</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
