import { Fragment } from 'react';
import { Box, Typography } from '@mui/material';

export default function UserHome() {
    
    //Claire's Changes and Notes:
    //added a user homepage that is more personalised for each user, needs ideas of what to display
    
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
                    This is a personalised homepage for a user.
                    <br />
                    Ideas for this page:
                    <br />
                    -suggest more records based off of preferences (liked artists, vinyl albums of stuff listened to on lastFM, tags, etc)
                    <br />
                    -suggest records to buy/sell (info gained from Discogs somehow?)
                    <br />
                    -user statistics
                    </Typography>
                </Box>
            </Fragment>
    );
}
