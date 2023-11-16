import { Fragment } from 'react';
import { Box, Typography } from '@mui/material';
import OAuthButtons from './Settings/OAuthButtons';

export default function Settings() {
    
    //Claire's Changes and Notes:
    //created the page, don't really know what to put
    
    return (
            <Fragment>
                <Box sx={{
                    height: 900,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#353939'
                }}>
                    <Typography sx={{
                        color: 'white'
                    }}>
                        This is the settings page
                    </Typography>
                    <OAuthButtons />
                </Box>
            </Fragment>
    );
}

