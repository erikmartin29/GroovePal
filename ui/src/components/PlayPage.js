import { Fragment } from 'react';
import { Box, Container } from '@mui/material';

const collectionData = require ("./discogs_releases_example.json");

export default function PlayPage() {
    
    //hard coding this for now, needs to be given to this page by Collection Page
    let rowIdx = 0
    let keys = Object.keys(collectionData.releases[0].basic_information)
    
    return (
            <Fragment>
                <Box sx={{
                    width: '100%',
                    height: 750,
                    border: 1
                }}>
                    <Container sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        border: 1
                    }}>
                        <Box sx={{
                            width: '25%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            border: 1
                        }}>
                            <Box sx={{
                                width: 175,
                                height: 175,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mt: 2,
                                ml: 2,
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
                                border: 1
                            }}>
                                <p>
            Album: {collectionData.releases[0].basic_information.title}
            <br />
            Artists:
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
                                border: 1
                            }}>
                                Tags
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
                            border: 1
                        }}>
                            Track List
                        </Box>
                    </Container>
                </Box>
            </Fragment>
    );
}
