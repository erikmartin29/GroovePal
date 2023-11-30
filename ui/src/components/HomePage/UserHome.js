import { Fragment, useState, useEffect } from 'react';
import { Stack, Button, Grid, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthConsumer } from '../../context/AuthProvider';
import { getPlays, getMostPlayedAlbum, getMostPlayedArtist } from '../../utils/api_provider/api_provider';


const RecentTracksRows = (props) => {

    const { row, index } = props

    const date = new Date(Number(row.timestamp) * 1000);
    const formattedTime = date.toLocaleString();


    return (
        <TableRow key={index}>
            <a href={`/play/${row.release_id}`}>
            <TableCell sx={{borderBottom: "none"}}>
                <img src={row.image_url} width="125" height="125" />
            </TableCell>
            </a>
            <TableCell sx={{borderBottom: "none"}} align='left'> 
                <Typography
                sx={{
                    color: 'white',
                    mb: 1,
                    fontSize: 20
                }}> {row.track_name} 
                </Typography>
                <Typography
                sx={{
                    color: '#bbbbbb',
                    mb: 1,
                    fontSize: 15.5
                }}> {row.track_album} 
                </Typography>
                <Typography
                sx={{
                    color: '#bbbbbb',
                    mb: 1,
                    fontSize: 15.5
                }}> {row.track_artist} 
                </Typography>
                <Typography
                sx={{
                    color: '#bbbbbb',
                    mb: 1,
                    fontSize: 15.5
                }}> {formattedTime} 
                </Typography>
                
            </TableCell>
        </TableRow>
    )
}

const TopAlbumListRows = (props) => {

    const { image_url, label, frequency, index, release_id } = props;

    if (index < 3) {

        return (
            <a href={`/play/${release_id}`} style={{ textDecoration: 'none' }}>
            <ListItem divider="true">
                <Grid container sx={{ alignItems: "left" }}>
                    <Grid item xs={4}>
                        <img src={image_url} width="80" height="80" />
                    </Grid>

                    <Grid item xs={6}>
                        <ListItemText primary={<Typography
                        sx={{
                            color: 'white',
                            mb: 1,
                            fontSize: 20,
                            mb: 0
                        }}> {label}
                        </Typography>} 
                        secondary={<Typography
                        sx={{
                            color: '#bbbbbb',
                            mb: 1,
                            fontSize: 15.5
                        }}> {`${frequency} plays`}
                        </Typography>}/>
                    </Grid>
                </Grid>
            </ListItem>
            </a>
        )
    }

    return (
        <ListItem >
            <a href={`/play/${release_id}`} style={{ textDecoration: 'none' }}><ListItemText primary={label} secondary={`plays: ${frequency}`} /></a>
        </ListItem>
    )
}

const TopArtistListRows = (props) => {

    const { image_url, label, frequency, index, size } = props;

    if (index < 3) {

        return (
            <ListItem divider="true">
                <Grid container sx={{ alignItems: "left" }}>
                    {/*<Grid item xs={4}>
                        <img src={image_url} width="80" height="80" />
                    </Grid>*/}

                    <Grid item xs={10}>
                        <ListItemText primary={<Typography
                        sx={{
                            color: 'white',
                            mb: 1,
                            fontSize: 20,
                            mb: 0
                        }}> <a style={{ textDecoration: 'none', color: 'white' }} href={`/collection?search=${label}`}>{label}</a>
                        </Typography>} 
                        secondary={<Typography
                        sx={{
                            color: '#bbbbbb',
                            mb: 1,
                            fontSize: 15.5
                        }}> {`${frequency} plays`}
                        </Typography>}/>
                    </Grid>
                </Grid>
            </ListItem>
        )
    }

    return (
        <ListItem >
            <ListItemText primary={label} secondary={`plays: ${frequency}`} />
        </ListItem>
    )
}

const createList = (num) => {
    return new Array(num).fill();
}

export default function UserHome() {

    const { username } = AuthConsumer();
    const [recentTracks, setRecentTracks] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    let navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            await getPlays(username).then(res => {
                console.log(res);
                setRecentTracks(res.data);
            }).catch(error => {
                console.log(error);
            });

            await getMostPlayedArtist(username).then(res => {
                setTopArtists(res.data.albums);
                console.log(res.data);
            }).catch(error => {
                console.log(error);
            });

            await getMostPlayedAlbum(username).then(res => {
                console.log(res.data);
                setTopAlbums(res.data.albums);
            }).catch(error => {
                console.log(error);
            });
            setLoading(false);
        }
        getData(username);
    }, [username])

    if (loading) {
        return (
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    bgcolor: '#222222',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress sx={{ color: 'white' }} />
            </Box>
        );
    }

    if (recentTracks.length === 0)
    return (
        <Stack
            sx={{
                width: '100vw',
                height: '75vh',
                bgcolor: '#222222',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant='h5' sx={{ color: 'white', fontWeight:'bold' }}>
                    You haven't scrobbled anything with GroovePal yet!
            </Typography>

            <Typography variant='h6' sx={{ color: 'white' }}>
                    Scrobble something from your collection to get started.
            </Typography>

            <Button
                    sx={{
                        mt: 2,
                        mb: 3,
                        color: 'black',
                        backgroundColor: 'white',
                        width: 180,
                        '&:hover': {
                            backgroundColor: 'black',
                            color: 'white',
                        }
                    }}
                    variant="contained"
                    onClick={() => navigate('/collection', { replace: true }
                    )
                    }
            >
                    Go To Collection
            </Button>
        </Stack>
    ); 

    return (
        <Fragment>
            <Box sx={{
                height: '90vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#222222',
                pt: 1,
                pb: 1
            }}>
                <Box sx={{
                    width: '30%',
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    pr: 2
                }}>
                    <Typography variant="h4" sx={{
                        color: 'white',
                        mb: 1,
                        fontWeight: 'bold'
                    }}>
                        Recently Scrobbled Tracks
                    </Typography>
                    <TableContainer component={Paper} style={{ maxHeight: 650 }}>
                        <Table stickyHeader sx={{
                            width: '100%',
                            minHeight: '80vh',
                            bgcolor: '#141414'
                        }}>
                            <colgroup>
                                <col style={{ width: '10%' }} />
                                <col style={{ width: '90%' }} />
                            </colgroup>
                            <TableBody>
                                {
                                    recentTracks.map((row, index) => (
                                        <RecentTracksRows row={row} index={index} />
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box sx={{
                    width: '20%',
                    height: '90%',
                }}>

                    <Box sx={{
                        mb: 2
                    }}>
                        <Typography variant="h4" sx={{
                            color: 'white',
                            mb: 1,
                            fontWeight: 'bold'
                        }}>
                            Top Albums
                        </Typography>
                        <List sx={{
                            bgcolor: '#141414',
                            maxHeight: 300,
                            position: 'relative',
                            overflow: 'auto'
                        }}>
                            {
                                topAlbums.slice(0,3).map((row, index) => (
                                    <TopAlbumListRows release_id={row.release_id} image_url={row.image_url} label={row.track_album} index={index} frequency={row.album_freq} size={topAlbums.length} />
                                ))
                            }
                        </List>
                    </Box>
                    <Box>
                        <Typography variant="h4" sx={{
                            color: 'white',
                            mb: 1,
                            fontWeight: 'bold'
                        }}>
                            Top Artists
                        </Typography>
                        <List sx={{
                            bgcolor: '#141414',
                            maxHeight: 300,
                            position: 'relative',
                            overflow: 'auto'
                        }}>
                            {
                                topArtists.slice(0,3).map((row, index) => (
                                    <TopArtistListRows image_url={row.image_url} row={row} label={row.track_artist} frequency={row.artist_freq} index={index} size={topArtists.length} />
                                ))
                            }
                        </List>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
}
