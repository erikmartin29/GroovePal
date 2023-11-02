import { Fragment, useState } from 'react';
import { Box, Grid, Button, Container } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const collectionData = require ("./discogs_releases_example.json");

const Cell = (props) => {
    //props will go here
    //onclick to change to the play page with the album info
    const {rowIdx, navigate} = props
    
    
    
    return (
            <Grid item key={rowIdx} xs={6} sm={4} md={3} lg={2} xl={1}>
                <Box sx={{
                    width: 175,
                    height: 175,
                    border: 1
                }}
            onClick={() => {
                console.log(`${rowIdx} album was clicked`);
                navigate('/play', {Index: {rowIdx}})
            }}
                >
            <img src={ collectionData.releases[rowIdx].basic_information.thumb }
                alt={ collectionData.releases[rowIdx].basic_information.title }
                width="175" height="175" />
                </Box>
            </Grid>
    );
}

const albumDisplay = (num) => {
    return (
            new Array(num).fill()
    );
}

export default function CollectionPage() {
    
    let navigate = useNavigate();
    
    let numReleases = collectionData.releases.length;
    
    const [albumsList, setAlbumsList] = useState(albumDisplay(numReleases));
    const keys = Object.keys(collectionData.releases[0].basic_information);
    
    let tempHolder = collectionData.releases[0].basic_information.thumb;
    let testEevee = "https://s1.zerochan.net/Eevee.600.2390141.jpg"
    let testThumb = "http://api-img.discogs.com/FGmDbZ6M9wNPwEAsn0yWz1jzQuI=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7781525-1449187274-5587.jpeg.jpg"
    
    return (
            <Fragment>
                <Box sx={{
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}>
                        <Button sx={{
                            color: 'black',
                            m: 2
                        }}
                        variant="outlined"
                        color="inherit">
                            Add Album
                        </Button>
                    </Box>
                    <Container sx={{
                        display: 'flex',
                    }}>
            <Grid container spacing={2}>
            {
                albumsList.map(() => <Cell rowIdx={0} navigate={navigate}/>)
            }
            </Grid>
                    </Container>
                </Box>
            </Fragment>
    );
}
