import { Fragment } from 'react';
import { Box, Typography } from '@mui/material';

export default function ProfilePage() {
    
    //Claire's Changes and Notes:
    //created the page, don't really know what we want to put here
    //do we want a friends/followers system?
    
    return (
            <Fragment>
                <Box sx={{
                    height: '100vh',
                    bgcolor: '#222222',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Typography sx={{
                    color: 'white'
                }}>
                This is the profile page
                <br />
                Ideas:
                <br />
                -about section written by the user (in settings?)
                </Typography>
                </Box>
            </Fragment>
    );
}
