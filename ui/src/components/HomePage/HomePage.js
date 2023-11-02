import { Fragment } from 'react';
import { Box } from '@mui/material';

export default function HomePage() {

    return (
        <Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <p>
                The basic homepage for the website. Not protected.
                <br />
                Ideas:
                <br />
                -explanation as to what this site is
                <br />
                -general analytics from user data? (popular songs/albums/artists, overall hours spent listening to music, etc)
                </p>
            </Box>
        </Fragment>
    );
}
