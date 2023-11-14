import { Fragment, useState } from 'react';
import { Box, Grid, Button, Container, TextField, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const collectionData = require ("./discogs_releases_example.json");

//Claire's Changes and Notes:
//created the page, procedurally generates the collection grid, some things hardcoded for now
//do we want a tooltip for the grid with each album's name and artist?
//do we want a search bar to search for specific albums in the collection?
//side bar with list of all tags used by that user, that you can click and filters albums with those tags (favourites always there)
//have a favourites tag, but make that one a heart symbol and always there

const Cell = (props) => {
    
    //props will go here
    //onclick to change to the play page with the album info
    const {rowIdx, navigate} = props
    
    return (
            <Grid item key={rowIdx} xs={6} sm={4} md={3} lg={2} xl={1}>
                <Container>
                <Box sx={{
                    width: 175,
                    height: 175,
                    bgcolor: 'white',
                    boxShadow: 8,
                    border: 1
                }}
            onClick={() => {
                console.log(`${rowIdx} album was clicked`);
                navigate('/play')
            }}
                >
                    <img src={ collectionData.releases[rowIdx].basic_information.thumb }
                        alt={ collectionData.releases[rowIdx].basic_information.title }
                        width="175" height="175" />
                </Box>
                <Box>
                    <Typography sx={{
                        color: 'white'
                    }}>
                        {collectionData.releases[rowIdx].basic_information.title}
                        <br />
                        {collectionData.releases[rowIdx].basic_information.artists[0].name}
                    </Typography>
                </Box>
            </Container>
            </Grid>
    );
}

const albumDisplay = (num) => {
    return (
            new Array(num).fill({Index: 0})
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
    
    let rowIdx = 0;
    
    return (
            <Fragment>
                <Box sx={{
                    height: 900,
                    bgcolor: '#353939',
                    border: 1
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <TextField
                            sx={{
                                width: 400,
                                m: 2,
                                bgcolor: 'white',
                                boxShadow: 3
                            }}
                            label="Search"
                            type="search"
                            variant="filled"
                        >
                        </TextField>
                        <Button sx={{
                            bgcolor: '#e6e2d3',
                            color: 'black',
                            boxShadow: 8,
                            height: 45,
                            m: 2
                        }}
                        variant="contained"
                        color="inherit">
                            Add Album
                        </Button>
                    </Box>
                    <Container sx={{
                        display: 'flex',
                    }}>
            <Grid container spacing={2}>
            {
                albumsList.map((cur, Index) => <Cell rowIdx={Index} navigate={navigate}/>)
            }
            </Grid>
                    </Container>
                </Box>
            </Fragment>
    );
}
