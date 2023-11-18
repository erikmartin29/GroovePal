import { Fragment, useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText } from '@mui/material';

import {AuthConsumer} from '../../context/AuthProvider';
import {getPlays} from '../../utils/api_provider/api_provider';


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
    
    const {row, index, size} = props;
    
    let test = "test";
    
    if (index < size-1) {
        
        return (
                <ListItem divider="true">
                    <ListItemText primary={test}/>
                </ListItem>
                )
    }
    
    return (
            <ListItem>
                <ListItemText primary={test} />
            </ListItem>
    )
}

const createList = (num) => {
    return new Array(num).fill();
}

export default function UserHome() {
    
    const {username} = AuthConsumer();
    const [recentTracks, setRecentTracks] = useState([]);
    const [topAlbums, setTopAlbums] = useState(createList(10));
    const [topArtists, setTopArtists] = useState(createList(10));
    
    useEffect(() => {
        getPlays(username).then( res => {
            console.log(res);
            setRecentTracks(res.data);
        }).catch( error => {
            console.log(error);
        })
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
                                               <TopListRows row={row} index={index} size={topAlbums.length}/>
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
                                                                    <TopListRows row={row} index={index} size={topArtists.length}/>
                                                                    ))
                                }
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Fragment>
    );
}
