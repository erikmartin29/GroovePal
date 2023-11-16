import { Fragment } from 'react';
import { Box, Typography } from '@mui/material';
import OAuthButtons from './Settings/OAuthButtons';

export default function Settings() {
    
    //Claire's Changes and Notes:
    //created the page, don't really know what to put
    
    return (
            <Fragment>
                <Box sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#353939'
                }}>
                <OAuthButtons />
                </Box>
            </Fragment>
    );
}

