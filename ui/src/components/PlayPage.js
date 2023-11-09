import { Fragment } from 'react';
import { Box, Container, Typography, Button, Chip, Stack } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const collectionData = require ("./discogs_releases_example.json");

const displayArtists = (props) => {
    const {index, item, rowIdx} = props;
    
    return (
            <Fragment>
            {collectionData.releases[rowIdx].basic_information.artists[index]}
            </Fragment>
    );
}

const handleDelete = () => {
    console.log("delete was clicked");
}

const handleClick = () => {
    console.log("Tag was clicked");
}

export default function PlayPage() {
    
    //Claire's Changes and Notes:
    //created the page, some things hardcoded for now
    //need some data to be passed from the Collection Page
    //need to display track list
    //how do we want to do tags? (use mui Chips?)
    //need to implement actual
    
    //hard coding this for now, needs to be given to this page by Collection Page
    let rowIdx = 0
    let keys = Object.keys(collectionData.releases[0].basic_information.artists)
    
    let text = "";
    for (let x in keys) {
        text += x + ", ";
    }
    
    let navigate = useNavigate();
    
    const artists = new Array(collectionData.releases[rowIdx].basic_information.artists.length).fill();
    
    //#353939
    return (
            <Fragment>
                <Box sx={{
                    width: '100%',
                    height: 900,
                    bgcolor: '#353939',
                }}>
                    <Box sx={{
                        display: 'flex'
                    }}>
                        <Button 
                            sx={{
                                m: 2
                            }}
                            variant="contained"
                            color="inherit"
                            onClick={() => navigate('/collection', {replace:true})}
                        >
                            Back
                        </Button>
                    </Box>
                    <Container sx={{
                        width: '100%',
                        height: 700,
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Box sx={{
                            width: '25%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Box sx={{
                                width: 175,
                                height: 175,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mt: 2,
                                ml: 2,
                            bgcolor: 'white',
                            boxShadow: 8,
                                border: 1
                            }}>
                                <img src={ collectionData.releases[rowIdx].basic_information.thumb }
                                    alt={ collectionData.releases[rowIdx].basic_information.title }
                                width="175" height="175" />
                            </Box>
                            <Box sx={{
                                width: 230,
                                height: 100,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mt: 2,
                                ml: 2,
                            bgcolor: '#e6e2d3',
                            boxShadow: 8,

                                border: 1
                            }}>
                                <p>
                                Album: {collectionData.releases[rowIdx].basic_information.title}
                                <br />
            Artists: {artists.map((item, index) => <displayArtists index={index} item={item} rowIdx={rowIdx} />)}
            <br />
            anything else?
                                </p>
                            </Box>
                            <Box sx={{
                                width: 230,
                                height: 300,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mt: 2,
                                ml: 2,
                            bgcolor: '#e6e2d3',
                            boxShadow: 8,

                                border: 1,
                                borderRadius: '16px'
                            }}>
                                <Stack>
                                    <Chip
                                        sx={{
                                            width: '100%',
                                        }}
                                        label="Testing Width Tag"
                                    />
                                    <Chip
                                        sx={{
                                            
                                        }}
                                        label="Test"
                                    />
                                    <Chip
                                        sx={{
                                        }}
                                        label="Tag 3"
                                    />
                                </Stack>
                            </Box>
                        </Box>
                        <Box sx={{
                            width: '75%',
                            height: '90%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mx: 2,
                            my: 2,
                        bgcolor: '#e6e2d3',
                        boxShadow: 8,

                            border: 1
                        }}>
                            Track List
                        </Box>
                    </Container>
            <Typography sx={{
                color: 'white'
            }}>
            Ideas/Notes:
            <br />
            -liner notes?
            <br />
            -display back image as well as front
            <br />
            -add title at top of page (not app bar), album title with artist?
            </Typography>
                </Box>
            
            </Fragment>
    );
}
