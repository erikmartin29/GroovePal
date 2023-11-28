import { Fragment, useState, useEffect } from 'react';
import { Grid, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

import { AuthConsumer } from '../../context/AuthProvider';
import { getPlays, getMostPlayedAlbum, getMostPlayedArtist } from '../../utils/api_provider/api_provider';


const RecentTracksRows = (props) => {

    const { row, index } = props

    const date = new Date(Number(row.timestamp) * 1000);
    const formattedTime = date.toLocaleString();


    return (
        <TableRow key={index}>
            <TableCell sx={{borderBottom: "none"}}>
                <img src={row.image_url} width="125" height="125" />
            </TableCell>
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

    const { image_url, label, frequency, index, size } = props;

    if (index < 3) {

        return (
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
        )
    }

    return (
        <ListItem >
            <ListItemText primary={label} secondary={`plays: ${frequency}`} />
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
                    bgcolor: '#353939',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress sx={{ color: 'white' }} />
            </Box>
        );
    }

    return (
        <Fragment>
            <Box sx={{
                height: '90vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#353939',
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
                                    <TopAlbumListRows image_url={row.image_url} label={row.track_album} index={index} frequency={row.album_freq} size={topAlbums.length} />
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
