import { Fragment, useEffect, useState } from 'react';
import { getDiscogsRelease, getDiscogsReleaseImage, bulkScrobble } from '../utils/api_provider/api_provider';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthConsumer } from '../context/AuthProvider';
import { Box, Container, Typography, Button, Chip, Grid, ThemeProvider, Divider, CircularProgress, LinearProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { blue, grey, green } from '@mui/material/colors';
import CircleIcon from '@mui/icons-material/Circle';
import CheckIcon from '@mui/icons-material/Check';

const handleDelete = () => {
    console.log("delete was clicked");
}

const handleClick = () => {
    console.log("Tag was clicked");
}

const TracklistTable = (props) => {
    const { tracks, played, playing } = props

    //console.log('played', played);
    //console.log('playing', playing);

    const get_status = (idx) => {
        if (played.includes(idx))
            return 1; //played
        if (idx === playing)
            return 2; //playing
        return 3; //unplayed
    };

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table sticky-header sx={{ minWidth: 400, bgcolor: '#141414' }} size="small" aria-label="sticky table">
                <colgroup>
                    <col style={{ width: '90%' }} />
                    <col style={{ width: '3.33%' }} />
                    <col style={{ width: '3.33%' }} />
                    <col style={{ width: '3.33%' }} />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ textAlign: 'start', borderBottom: "none" }}><Typography sx={{ fontWeight: 'bold', color: 'white' }}>Track</Typography></TableCell>
                        <TableCell sx={{ borderBottom: "none" }}></TableCell>
                        <TableCell sx={{ borderBottom: "none" }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tracks.map((track, idx) => {
                        return <TableRow
                            key={track.title}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{ borderBottom: "none" }}><Typography sx={{ color: 'white' }}>{track.title}</Typography></TableCell>
                            <TableCell sx={{ borderBottom: "none" }} align="right"><Typography sx={{ color: 'white' }}>{track.position || ""}</Typography></TableCell>
                            <TableCell sx={{ borderBottom: "none" }} align="right"><Typography sx={{ color: 'white' }}>{track.duration || "XX:XX"}</Typography></TableCell>
                            <TableCell sx={{ display: 'flex', justifyContent: 'end', borderBottom: 'none' }}>
                                {(() => {
                                    switch (get_status(idx)) {
                                        case 1:
                                            // played
                                            return <CheckIcon sx={{
                                                margin: '0px',
                                                padding: '0px',
                                                color: green[500],
                                            }} />;
                                        case 2:
                                            // playing
                                            return <CircularProgress
                                                size='1.5rem'
                                                sx={{
                                                    margin: '0px',
                                                    padding: '0px',
                                                    color: 'white',
                                                }} />;
                                        default:
                                            // not played
                                            return <CircleIcon sx={{
                                                margin: '0px',
                                                padding: '0px',
                                                color: grey[800],
                                            }} />;
                                    }
                                })()}
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const Tag = (props) => {

    const { item, index } = props;
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
    const { index } = props;

    let title = "Tag " + `${index + 1}`;

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

    const { allTags, editting, onClickCallback } = props;

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

    const { tagsList, editting, onClickCallback } = props;

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
            mb: 2,
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
    const [loading, setLoading] = useState(true);

    const [played, setPlayed] = useState([]);
    const [playing, setPlaying] = useState(-1);

    const { username } = AuthConsumer();
    const { albumID } = useParams();

    const [scrobbling, setScrobbling] = useState(false);
    const [scrobblingComplete, setScrobblingComplete] = useState(false);

    const [sides, setSides] = useState([]);
    const [nextSide, setNextSide] = useState(0);
    const [maxSide, setMaxSide] = useState(0);

    const [tracklist, setTracklist] = useState([]);
    const [partitionedTracklist, setPartitionedTracklist] = useState([]);

    const [release, setRelease] = useState([]);
    const [releaseImg, setReleaseImg] = useState([]);

    const [buttonText, setButtonText] = useState("Scrobble");

    //create useState for the array of tags, hard code size for now, figure out dynamics later
    const [tagsList, setTagsList] = useState(blankTags(0));
    const [allTags, setAllTags] = useState(blankTags(10));
    const [editting, setEditting] = useState(false);

    const convertToMilliseconds = (timestr) => {
        const [minutes, seconds] = timestr.split(':').map(Number);
        //return 500; // just here for degugging
        return (minutes * 60000) + (seconds * 1000);
    }

    const buildScrobbleList = (sideIdx) => {
        setScrobbling(true)
        let start_time = Date.now();

        return partitionedTracklist[sideIdx].map((track) => {
            const timestamp = convertToMilliseconds(track.duration);
            start_time += timestamp;
            return {
                artist: release['artists'][0]['name'],
                album: release['title'],
                track: track.title,
                timestamp: Math.floor(start_time / 1000),
            };
        });
    }


    const delay_play = (track, scrobble_list, idx) => {
        return new Promise(async (resolve) => {
            const delay = convertToMilliseconds(track.duration)
            console.log(`playing ${track.title}`);
            setTimeout(async () => {
                console.log(`finished: ${track.title}`);
                bulkScrobble(username, scrobble_list.slice(idx, idx + 1), releaseImg, release.id)
                    .then(res => {
                        console.log(res);
                    }).catch(error => {
                        console.log(error)
                    }).finally(() => {
                        resolve(true);
                    })
            }, delay);
        });
    }

    const scrobble_emulate_play = async (scrobble_list) => {
        for (let idx = 0; idx < scrobble_list.length; idx++) {
            let tmpPlayed = played;
            let playingIdx = tmpPlayed.length;
            setPlaying(playingIdx);
            await delay_play(release.tracklist[playingIdx], scrobble_list, idx);
            tmpPlayed.push(playingIdx);
            setPlayed(tmpPlayed);
        }

        setButtonText("Scrobble Side " + sides[nextSide + 1])
        setNextSide(nextSide + 1)

        if (nextSide + 1 >= maxSide) {
            setButtonText("Scrobbling Complete")
            setScrobblingComplete(true);
        }

        setScrobbling(false);
    };

    // todo render snackbar when scrobble session is completed
    const scrobble = (sideIdx) => {
        const scrobble_list = buildScrobbleList(sideIdx);
        scrobble_emulate_play(scrobble_list);
    }

    useEffect(() => {
        const getData = async () => {
            let rel = await getDiscogsRelease(albumID, username);
            setRelease(rel.data);
            setTracklist(rel.data.tracklist);

            let tmpTags = []
            if (rel.data.genres !== undefined)
                tmpTags.push(...rel.data.genres);
            if (rel.data.styles !== undefined)
                tmpTags.push(...rel.data.styles);
            setTagsList(tmpTags);

            let relImg = await getDiscogsReleaseImage(albumID, username);
            setReleaseImg(relImg.data);

            //TODO: Move this to a function (currently not working, probably due some async problems)
            //formatTracklist();
            let list = [];
            let sides = [];
            for (let i = 0; i < rel.data.tracklist.length; i++) {
                if (!sides.includes(rel.data.tracklist[i].position.charAt(0))) {
                    sides.push(rel.data.tracklist[i].position.charAt(0));
                    list.push([]);
                }
                list[sides.length - 1].push(rel.data.tracklist[i]);
            }
            setMaxSide(sides.length);
            setPartitionedTracklist(list);

            setSides(sides);
            setButtonText("Scrobble Side " + sides[0])

            setLoading(false);
        }
        getData(albumID);
    }, [albumID, username]);

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
    if (loading) {
        return (
            <Box
                sx={{
                    width: '100vw',
                    height: '75vh',
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

    function handleScrobbleClick() {
        //console.log('scrobbling side', nextSide);
        if (nextSide >= maxSide) {
            alert("You've already scrobbled all sides!")
            setButtonText("Scrobbling Complete")
            setScrobbling(true);
            return;
        }
        setButtonText("Scrobbling... ")
        scrobble(nextSide)
        setNextSide(nextSide + 1)
    }

    //#353939
    return (
        <Fragment>
            <Box sx={{ width: '100%', height: '100vh', bgcolor: '#222222' }}>
                <Box sx={{ display: 'flex' }}>
                    <Button sx={{ m: 2, bgcolor: '#141414', color: 'white' }}

                        variant="contained"
                        onClick={() => navigate('/collection', { replace: true }
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
                            <img src={releaseImg || release.thumb || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"}
                                alt={release.title}
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
                            <Typography sx={{ alignText: 'center', padding: '5px', color: "white", fontSize: '20pt', fontWeight: 'bold' }}>
                                {release.title}
                            </Typography>
                            <Typography sx={{ alignText: 'center', padding: '5px', color: "white", fontSize: '15pt', mb: 1 }}>
                                {release.artists[0].name}
                            </Typography>
                            <Button
                                disabled={scrobbling || scrobblingComplete}
                                sx={{
                                    bgcolor: 'black', color: 'white',
                                    '&:disabled': {
                                        color: 'white',
                                    },
                                    '&:hover': {
                                        color: 'white',
                                        backgroundColor: 'red',
                                    }
                                }}
                                variant='contained'
                                onClick={() => {
                                    handleScrobbleClick();
                                }}>
                                {buttonText}
                            </Button>
                            {scrobbling && <LinearProgress sx={{
                                mt: 1, backgroundColor: 'black',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: 'white'
                                }
                            }} />}
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
                        <TracklistTable played={played} playing={playing} tracks={tracklist || []} />
                    </Box>

                </Container>
            </Box>
        </Fragment>
    );
}
