import { Fragment, useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

import {AuthConsumer} from '../../context/AuthProvider';
import {getPlays, getMostPlayedAlbum, getMostPlayedArtist} from '../../utils/api_provider/api_provider';


const RecentTracksRows = (props) => {
    
    const {row, index} = props
    
    const date = new Date(Number(row.timestamp)*1000);
    const formattedTime = date.toLocaleString();
    
    
    return (
            <TableRow key={index}>
                <TableCell>
                    <img src={row.image_url} width="100" height="100"/>
                </TableCell>
                <TableCell> {row.track_name} </TableCell>
                <TableCell> {row.track_artist} </TableCell>
                <TableCell> {row.track_album} </TableCell>
                <TableCell> {formattedTime} </TableCell>
            </TableRow>
    )
}

const TopListRows = (props) => {
    
    const {label, frequency, index, size} = props;
    
    if (index < size-1) {
        
        return (
                <ListItem divider="true">
                    <ListItemText primary={label} secondary={`plays: ${frequency}`}/>
                </ListItem>
                )
    }
    
    return (
            <ListItem >
                <ListItemText primary={label} secondary={`plays: ${frequency}`}/>
            </ListItem>
    )
}

const createList = (num) => {
    return new Array(num).fill();
}

export default function UserHome() {
    
    const {username} = AuthConsumer();
    const [recentTracks, setRecentTracks] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getData = async () => {
            await getPlays(username).then( res => {
                console.log(res);
                setRecentTracks(res.data);
            }).catch( error => {
                console.log(error);
            });

            await getMostPlayedArtist(username).then( res => {
                setTopArtists(res.data.albums);
                console.log(res.data);
            }).catch( error => {
                console.log(error);
            });

            await getMostPlayedAlbum(username).then( res => {
                console.log(res.data);
                setTopAlbums(res.data.albums);
            }).catch( error => {
                console.log(error);
            });
            setLoading(false);
        }
        getData(username);
    }, [username])

    if ( loading )  {
        return (
            <Box
                sx={{
                    width: '100vw',
                    height: '75vh',
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
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#353939',
                    pt: 2,
                    pb: 2
                }}>
                    <Box sx={{
                        width: '70%',
                        height: '90%',
                        display: 'flex',
                        flexDirection: 'column',
                        pr: 2
                    }}>    
                    <Typography variant="h4" sx={{
                        color: 'white'
                    }}>
                        Recent Tracks
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{
                            width: '100%',
                            minHeight: '80vh'
                        }}>
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
                                color: 'white'
                            }}>
                                Top Albums
                            </Typography>
                            <List sx={{
                                bgcolor: 'white',
                                maxHeight: 300,
                                position: 'relative',
                                overflow: 'auto'
                            }}>
                                {
                                    topAlbums.map((row, index) => (
                                        <TopListRows label={row.track_album} index={index} frequency={row.album_freq} size={topAlbums.length}/>
                                    ))
                                }
                            </List>
                        </Box>
                        <Box>
                            <Typography variant="h4" sx={{
                                color: 'white'
                            }}>
                                Top Artists
                            </Typography>
                            <List sx={{
                                bgcolor: 'white',
                                maxHeight: 300,
                                position: 'relative',
                                overflow: 'auto'
                            }}>
                                {
                                    topArtists.map((row, index) => (
                                        <TopListRows row={row} label={row.track_artist} frequency={row.artist_freq} index={index} size={topArtists.length}/>
                                    ))
                                }
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Fragment>
    );
}
