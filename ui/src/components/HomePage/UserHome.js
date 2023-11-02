import { Fragment } from 'react';
import { Box } from '@mui/material';

export default function UserHome() {
    
    return (
            <Fragment>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <p>
                    This is a personalised homepage for a user. Probably protected?
                    <br />
                    Ideas for this page:
                    <br />
                    -suggest more records based off of preferences (liked artists, vinyl albums of stuff listened to on lastFM, tags, etc)
                    <br />
                    -suggest records to buy/sell (info gained from Discogs somehow?)
                    <br />
                    -user statistics
                    </p>
                </Box>
            </Fragment>
    );
}
