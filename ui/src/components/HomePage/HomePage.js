import { Fragment } from 'react';
import { Box, Typography } from '@mui/material';

export default function HomePage() {

    //Claire's Changes and Notes:
    //basic homepage anyone will see when they reach the site, needs ideas of what to display
    //reccomendations for vinyl albums based on tags/artists
    //what friends are listening to (if friends/follow system implemented)
    //
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
                The basic homepage for the website. Not protected.
                <br />
                Ideas:
                <br />
                -explanation as to what this site is
                <br />
                -general analytics from user data? (popular songs/albums/artists, overall hours spent listening to music, etc)
                </Typography>
            </Box>
        </Fragment>
    );
}
