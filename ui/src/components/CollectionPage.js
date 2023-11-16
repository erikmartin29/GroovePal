import { Fragment, useEffect, useState } from 'react';
import { Box, Grid, Button, Container, TextField, Typography, CircularProgress } from '@mui/material';
import { AuthConsumer } from '../context/AuthProvider';
import { getDiscogsCollection, getDiscogsRelease, getDiscogsReleaseImage } from '../utils/api_provider/api_provider';

import { useNavigate } from 'react-router-dom';

//Claire's Changes and Notes:
//created the page, procedurally generates the collection grid, some things hardcoded for now
//do we want a tooltip for the grid with each album's name and artist?
//do we want a search bar to search for specific albums in the collection?
//side bar with list of all tags used by that user, that you can click and filters albums with those tags (favourites always there)
//have a favourites tag, but make that one a heart symbol and always there

const Cell = (props) => {
    
    //props will go here
    //onclick to change to the play page with the album info
    const {item ,rowIdx, navigate} = props
    
    return (
            <Grid item key={rowIdx} xs={6} sm={4} md={3} lg={2} xl={2}>
                <Container>
                <Box sx={{
                    flexGrow: 1,
                    width: 175,
                    height: 175,
                    bgcolor: 'white',
                    boxShadow: 8,
                    border: 1
                }}

                onClick={() => {
                console.log(`${item.basic_information.title}  was clicked`);
                navigate(`/play/${item.id}`)
                }}
                >
                    <img src={ item.basic_information.cover_image }
                        alt={ item.basic_information.title }
                        width="175" height="175" />
                </Box>
                <Box>
                    <Typography sx={{
                        color: 'white'
                    }}>
                        {/*item.basic_information.title*/}
                        <br />
                        {/*item.basic_information.artists[0].name*/}
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

    const [collection, setCollection] = useState([]);
    const { username } = AuthConsumer();
    const [ loading, setLoading ] = useState(true);
    
    let navigate = useNavigate();

    // note: simplified api call, now that we dont need to 
    // explicity request the images

    const getData = async (username) => {
        let col = await getDiscogsCollection(username)
        var tmpArr = [];
        for(let i = 0; i < 10; i++) {
               let release = col.data["releases"][i];
               tmpArr.push(release)
               setCollection(tmpArr);
               setLoading(false);
        }
   }

    useEffect(() => {
        //getData(username);
        getDiscogsCollection(username).then( res => {
            console.log(res);
            setCollection(res.data['releases']);
        }).catch( error => {
            console.log(error);
        }).finally( () => {
            setLoading(false);
        })
    }, [username]);

    if ( loading ) 
        return (
            <Box>
                <Box sx={{
                    width: '100%',
                    height: '100vh',
                    bgcolor: '#353939',
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}> 
                    <CircularProgress sx={{color:'white'}}/>
                </Box> 
            </Box>
        )

    return (
            <Fragment>
                <Box sx={{
                    height: '100vh',
                    bgcolor: '#353939',
                    border: 1
                }}>
                    {/*temp spacer box for demo*/}
                    <Box
                        sx={{
                        height: 40,
                        bgcolor: '353939',
                        }}
                        >
                    </Box>

                    {/*
                    //commenting out for demo since its not working
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
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
                    */}
                    <Container sx={{
                        display: 'flex',
                    }}>
            <Grid container spacing={2}>
            {
                collection.map((item, idx) => <Cell key={idx} item={item} rowIdx={idx} navigate={navigate}/>)
            }
            </Grid>
                    </Container>
                </Box>
            </Fragment>
    );
}
