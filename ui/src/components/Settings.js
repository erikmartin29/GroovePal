import { Fragment, useState } from 'react';
import { Box, Input, Button } from '@mui/material';
import OAuthButtons from './Settings/OAuthButtons';

export default function Settings() {

    const [password, setPassword] = useState('');

    function changePassword() {
        console.log(password);
    }

    return (
        <Fragment>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#353939'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto',
                    mt: 10,
                    padding: 5,
                    width: 200,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: '10px',
                    borderColor: '#000000',
                    boxShadow: 8,
                    bgcolor: '#e6e6e6'
                }}>
                    <OAuthButtons />
                    <Input
                        placeholder="New Password"
                        type="password"
                        sx={{ margin: 2, width: 180 }}
                        required={true}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={() => {
                        // update password in the database
                        changePassword()
                    }}>
                        Change Password
                    </Button>
                </Box>
            </Box>
        </Fragment >
    );
}

