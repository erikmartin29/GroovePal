import { Fragment, useEffect, useState } from 'react';
import { Box, Grid, Button, Container, TextField, Typography, CircularProgress} from '@mui/material';
import { AuthConsumer } from '../context/AuthProvider';
import { getDiscogsCollection, getDiscogsRelease, getDiscogsReleaseImage } from '../utils/api_provider/api_provider';
import { useNavigate } from 'react-router-dom';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

//Claire's Changes and Notes:
//created the page, procedurally generates the collection grid, some things hardcoded for now
//do we want a tooltip for the grid with each album's name and artist?
//do we want a search bar to search for specific albums in the collection?
//side bar with list of all tags used by that user, that you can click and filters albums with those tags (favourites always there)
//have a favourites tag, but make that one a heart symbol and always there

const Cell = (props) => {
    
    const { item, rowIdx, navigate } = props;

    const BootstrapTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
          color: theme.palette.common.black,
          maxWidth: 1000,
          fontSize: theme.typography.pxToRem(12)
        },
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.black,
        },
    }));
    
    return (
        <Grid item key={rowIdx} xs={6} sm={4} md={3} lg={2} xl={2}>
            <Container>
                <Box
                    sx={{
                        flexGrow: 1,
                        width: 175,
                        height: 175,
                        boxShadow: '0px 0px 50px 8px rgba(0, 0, 0, 0.2)',
                        transition: 'transform 0.2s, boxShadow 0.2s',
                        "&:hover": {
                            transform: "scale(1.1)",
                            boxShadow: '0px 0px 50px 10px rgba(0, 0, 0, 0.2)',
                        }
                    }}
                    onClick={() => {
                        console.log(`${item.basic_information.title} was clicked`);
                        navigate(`/play/${item.id}`);
                    }}
                >
                    <BootstrapTooltip title={`${item.basic_information.title} - ${item.basic_information.artists[0].name}`} placement="bottom">
                        <img 
                            src={item.basic_information.cover_image}
                            alt={item.basic_information.title}
                            width="175" 
                            height="175"
                        />
                    </BootstrapTooltip>

                </Box>
                <Box>
                    <Typography sx={{ color: 'white' }}>
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

    const [filterString, setFilterString] = useState("");

    const { username } = AuthConsumer();
    const [ loading, setLoading ] = useState(true);
    
    let navigate = useNavigate();

    useEffect(() => {
        getDiscogsCollection(username).then( res => {
            //TODO: sort by various keys other than date_added
            let newArr = res.data['releases'].sort(function(a,b){
                let x = a.date_added
                let y = b.date_added
                if(x<y){return 1}
                if(x>y){return -1}
                return 0
            })
            setCollection(newArr);
        }).catch( error => {
            console.log(error);
        }).finally( () => {
            setLoading(false);
        })
    }, [username]);

    if ( loading ) 
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

    return (
            <Fragment>
                <Box sx={{
                    height: '100%',
                    bgcolor: '#353939',
                }}>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        m: 4
                    }}>
                        <TextField
                            sx={{
                                width: 400,
                                bgcolor: 'white',
                                boxShadow: 3
                            }}
                            label="Search"
                            type="search"
                            variant="filled"
                            onChange={(event) => setFilterString(event.target.value.toLowerCase())}
                        />
                    </Box>
                    <Container sx={{
                        display: 'flex',
                    }}>
                        <Grid container spacing={2}>
                        {

                            collection.filter((item) => {
                                if(filterString === "") return true;
                                // check through all artists
                                for(let i = 0; i < item.basic_information.artists.length; i++) {
                                    if(item.basic_information.artists[i].name.toLowerCase().startsWith(filterString)) 
                                        return true;
                                }
                                // check through all titles
                                return item.basic_information.title.toLowerCase().startsWith(filterString);
                            }).map((item, idx) => <Cell key={idx} item={item} rowIdx={idx} navigate={navigate}/>)
                        }
                        </Grid>
                    </Container>
                </Box>
            </Fragment>
    );
}
