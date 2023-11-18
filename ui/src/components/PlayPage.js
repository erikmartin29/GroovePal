import { Fragment, useEffect, useState } from 'react';
import { getDiscogsRelease, getDiscogsReleaseImage, bulkScrobble } from '../utils/api_provider/api_provider';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthConsumer } from '../context/AuthProvider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Container, Typography, Button, Chip, Grid, ThemeProvider, Divider, CircularProgress, LinearProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const handleDelete = () => {
    console.log("delete was clicked");
}

const handleClick = () => {
    console.log("Tag was clicked");
}

const TracklistTable = (props) => {
    const {tracks} = props
    console.log(tracks);
    
    return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table sticky-header sx={{ minWidth: 650 }} size="small" aria-label="sticky table">
        <TableHead>
            <TableRow>
                <TableCell sx={{ textAlign: 'start'}}><Typography sx={{ fontWeight: 'bold' }}>Track</Typography></TableCell>
                <TableCell sx={{ textAlign: 'end' }}><AccessTimeIcon /></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {tracks.map((track) => (
            <TableRow
              key={track.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{ track.title }</TableCell>
              <TableCell align="right">{ track.duration || "XX:XX" }</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

const Tag = (props) => {
    
    const {item, index} = props;
    let title = item;
    let disable = "";
    
    return (
        <Grid item key={index}>
            <Chip
                style={{ color: 'white' }}
                label={title}
                disabled={disable}
            />
        </Grid>
    );
}

const EditTag = (props) => {
    const {index} = props;
    
    let title = "Tag " + `${index+1}`;
    
    let disable = "";
    
    return (
    <Grid item key={index}>
        <Chip
            sx={{
    
            }}
            label={title}
            color="lightGreen"
            onDelete={handleDelete}
            disabled={disable}
        />
    </Grid>
    );
}

const Editor = (props) => {
    
    const {allTags, editting, onClickCallback} = props;
    
    if (editting === false) {
        return (
                <Fragment>
                </Fragment>
        )
    }
    
    return (
            <Box sx={{
                width: 230,
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'space-between',
                mt: 2,
                ml: 2,
                bgcolor: '#ffffff',
                boxShadow: 8,
                border: 1,
                //borderRadius: '16px'
            }}>
                <Grid container
                    spacing={1}
                    sx={{
                        m: 2,
                    }}>
                        {
                            allTags.map((cur, Index) => <EditTag index={Index} />)
                        }
                </Grid>
                <Button
                    sx={{
                        color: 'red'
                    }}
                    onClick={onClickCallback()}
                >
                    Finish
                </Button>
            </Box>
    );
}

const TagDisplay = (props) => {
    
    const {tagsList, editting, onClickCallback} = props;
    
    if (editting === true) {
        return (
                <Fragment>
                </Fragment>
        )
    }
    
    return (
            <Box sx={{
                width: 230,
                //height: 230,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',
                alignItems: 'left',
                mb:2,
            }}>
                <Grid container
                    spacing={1}
                    sx={{ mt: 2 }}>
                    {
                            tagsList.map((item, idx) => <Tag key={idx} item={item} index={idx} />)
                    }
                </Grid>
                {/*<Button
                    sx={{
                        color: 'red'
                    }}
                    onClick={onClickCallback()}
                >
                    Edit Tags
                </Button>*/}
            </Box>
    );
};

//create the array for the tags
const blankTags = (num) => {
    return (new Array(num).fill());
}

export default function PlayPage() {
    
    //Claire's Changes and Notes:
    //created the page, some things hardcoded for now
    //need some data to be passed from the Collection Page
    //need to display track list
    //how do we want to do tags? (use mui Chips?)
    //need to implement actual

    const [loading, setLoading] = useState(true);
    const { username } = AuthConsumer();
    const { albumID } = useParams();
    const [ scrobbling, setScrobbling ] = useState(false);

    const [release, setRelease] = useState([]);
    const [releaseImg, setReleaseImg] = useState([]);

    const convertToMilliseconds = (timestr) => {
        const [ minutes, seconds] = timestr.split(':').map(Number);
        return (minutes*60000) + (seconds+1000);
    }

    const buildScrobbleList = () => {
        setScrobbling(true)
        let start_time = Date.now();
        return release.tracklist.map( (track) => {
            const timestamp = convertToMilliseconds(track.duration);
            start_time += timestamp;
            return {
                artist: release['artists'][0]['name'],
                album: release['title'],
                track: track.title,
                timestamp: Math.floor(start_time/1000),
            };
        });
    }

    // emulate api call w/ timeout
    const bulkScrobble_mock = () => {
        setTimeout(() => {
            setScrobbling(false);
        }, 5 * 1000)
    }

    const scrobble = () => {
        const scrobble_list = buildScrobbleList();
        console.log(scrobble_list)
        bulkScrobble(username, scrobble_list, releaseImg)
            .then( res => {
                console.log(res);
            })
            .catch( error => {
                console.log('error scrobbling', error);
            })
            .finally( () => setScrobbling(false) )
        //bulkScrobble_mock();
    }

    useEffect(() => {
        const getData = async (release) => {
            let rel = await getDiscogsRelease(albumID, username);
            setRelease(rel.data);

            let tmpTags = []
            if(rel.data.genres !== undefined)
                tmpTags.push(...rel.data.genres);
            if(rel.data.styles !== undefined)
                tmpTags.push(...rel.data.styles);
            setTagsList(tmpTags);
            
            let relImg = await getDiscogsReleaseImage(albumID, username);
            setReleaseImg(relImg.data);
            setLoading(false);
        }
        getData(albumID);
    }, [albumID, username]);

    //create useState for the array of tags, hard code size for now, figure out dynamics later
    const [tagsList, setTagsList] = useState(blankTags(0));
    const [allTags, setAllTags] = useState(blankTags(10));
    const [ tracklist, setTrackList ] = useState([]);
    const [editting, setEditting] = useState(false);
    
    //onclickcallbacks for the tag editting buttons
    const onClickCallbackEdit = () => {
        setEditting(true);
    }
    
    const onClickCallbackFinish = () => {
        setEditting(false);
    }
    
    //<TagDisplay tagsList={tagsList} />
    //<Editor allTags={allTags} />
    
    let navigate = useNavigate();

    // TODO: make color match theme, increase size and center 
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
    
    //#353939
    return ( 
            <Fragment>
                <Box sx={{ width: '100%', height: '100vh', bgcolor: '#353939'}}>
                    <Box sx={{ display: 'flex' }}>
                        <Button sx={{ m: 2, bgcolor: '#141414', color: 'white'}}
                        
                            variant="contained"
                            onClick={() => navigate('/collection', {replace:true}
                            )
                        }
                        >
                        Back to Collection
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
                            justifyContent: 'left',
                            alignItems: 'left',
                        }}>
                            <Box sx={{
                                width: 230,
                                height: 230,
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'left',
                                mt: 2,
                                ml: 2,
                                //bgcolor: 'white',
                                boxShadow: 8,
                                border: 1
                            }}>
                                <img src={ releaseImg || release.thumb || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"}
                                     alt={ release.title}
                                     width="230" 
                                     height="230" />
                            </Box>
                            <Box sx={{
                                width: 230,
                                height: 150,
                                //display: 'block',
                                mt: 2,
                                ml: 2,
                                justifyContent: 'left',
                                alignItems: 'left',
                            }}>
                                <Typography sx={{ alignText: 'center', padding: '5px', color:"white", fontSize: '20pt', fontWeight: 'bold'}}>
                                    { release.title }
                                </Typography>
                                <Typography sx={{ alignText: 'center', padding: '5px', color:"white", fontSize: '15pt', mb:1}}>
                                    { release.artists[0].name }
                                </Typography>
                                <Button disabled={scrobbling} sx={{ bgcolor: 'red', color: 'white' }} variant='contained' onClick={scrobble}>Scrobble</Button>   
                                { scrobbling && <LinearProgress sx={{mt:1}}/>}
                                <TagDisplay tagsList={tagsList} editting={false/*editting*/} onClickCallback={() => onClickCallbackEdit} />
                                {/*<Editor allTags={allTags} editting={editting} onClickCallback={() => onClickCallbackFinish} />*/}
                            </Box>
                        </Box>
                        
                        <Box sx={{
                            width: '75%',
                            //height: '400px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'top',
                            alignItems: 'top',
                            mx: 2,
                            my: 2,
                        }}>
                        <TracklistTable tracks={release.tracklist || []} />
                        </Box>

                    </Container>
                </Box>
            </Fragment>
    );
}
