import { Fragment, useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText } from '@mui/material';

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
    
    const {row, label, index, size} = props;
    
    
    if (index < size-1) {
        
        return (
                <ListItem divider="true">
                    <ListItemText primary={label}/>
                </ListItem>
                )
    }
    
    return (
            <ListItem>
                <ListItemText primary={label} />
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
    
    useEffect(() => {
        getPlays(username).then( res => {
            console.log(res);
            setRecentTracks(res.data);
        }).catch( error => {
            console.log(error);
        });

        getMostPlayedArtist(username).then( res => {
            setTopArtists(res.data.albums);
            console.log(res.data);
        }).catch( error => {
            console.log(error);
        });

        getMostPlayedAlbum(username).then( res => {
            console.log(res.data);
            setTopAlbums(res.data.albums);
        }).catch( error => {
            console.log(error);
        });

    }, [username])
    
    /*
     <TableCell>Thumbnail</TableCell>
     <TableCell>Song</TableCell>
     <TableCell>Artist</TableCell>
     <TableCell>Album</TableCell>
     <TableCell>Timestamp</TableCell>
     */
    return (
            <Fragment>
                <Box sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#353939'
                }}>
                    <Typography sx={{
                        color: 'white'
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
                                        <TopListRows row={row} index={index} frequency={0} size={topAlbums.length}/>
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
                                        <TopListRows label={row.track_album} frequency={0} index={index} size={topArtists.length}/>
                                    ))
                                }
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Fragment>
    );
}
