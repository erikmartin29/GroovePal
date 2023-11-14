import { Fragment, useState } from 'react';
import { Box, Container, Typography, Button, Chip, Grid, ThemeProvider } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { darkGreen, lightGreen, headerBrown } from './ColorPalette';

const collectionData = require ("./discogs_releases_example.json");


const handleDelete = () => {
    console.log("delete was clicked");
}

const handleClick = () => {
    console.log("Tag was clicked");
}

const Tag = (props) => {
    
    const {index} = props;
    
    let title = "Tag " + `${index+1}`;
    
    let disable = "";
    
    return (
            <ThemeProvider theme={lightGreen}>
                <Grid item key={index}>
                    <Chip
                        label={title}
                        color="lightGreen"
                        disabled={disable}
                    />
                </Grid>
            </ThemeProvider>
    );
}

const EditTag = (props) => {
    const {index} = props;
    
    let title = "Tag " + `${index+1}`;
    
    let disable = "";
    
    return (
            <ThemeProvider theme={lightGreen}>
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
            </ThemeProvider>
    );
}

const Editor = (props) => {
    
    const {allTags, editting, onClickCallback} = props;
    
    if (editting == false) {
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
                bgcolor: '#e6e2d3',
                boxShadow: 8,
                border: 1,
                borderRadius: '16px'
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
                    color="inherit"
                    onClick={onClickCallback()}
                >
                    Finish
                </Button>
            </Box>
    );
}

const TagDisplay = (props) => {
    
    const {tagsList, editting, onClickCallback} = props;
    
    if (editting == true) {
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
                bgcolor: '#e6e2d3',
                boxShadow: 8,
                border: 1,
                borderRadius: '16px'
            }}>
                <Grid container
                    spacing={1}
                    sx={{
                        m: 2,
                    }}>
                        {
                            tagsList.map((cur, Index) => <Tag index={Index} />)
                        }
                </Grid>
                <Button
                    sx={{
                        color: 'red'
                    }}
                    color="inherit"
                    onClick={onClickCallback()}
                >
                    Edit Tags
                </Button>
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
    
    //hard coding this for now, needs to be given to this page by Collection Page
    let rowIdx = 0
    
    //create useState for the array of tags, hard code size for now, figure out dynamics later
    const [tagsList, setTagsList] = useState(blankTags(5));
    const [allTags, setAllTags] = useState(blankTags(10));
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
    
    //#353939
    return (
            <Fragment>
                <Box sx={{
                    width: '100%',
                    height: 900,
                    bgcolor: '#353939',
                }}>
                    <Box sx={{
                        display: 'flex'
                    }}>
                        <Button 
                            sx={{
                                m: 2
                            }}
                            variant="contained"
                            color="inherit"
                            onClick={() => navigate('/collection', {replace:true})}
                        >
                            Back
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
                        }}>
                            <Box sx={{
                                width: 175,
                                height: 175,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mt: 2,
                                ml: 2,
                            bgcolor: 'white',
                            boxShadow: 8,
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
                            bgcolor: '#e6e2d3',
                            boxShadow: 8,

                                border: 1
                            }}>
                                <p>
                                    Album: {collectionData.releases[rowIdx].basic_information.title}
                                    <br />
                                    Artists:
                                    <br />
                                    anything else?
                                </p>
                            </Box>
                            <TagDisplay tagsList={tagsList} editting={editting} onClickCallback={() => onClickCallbackEdit} />
            <Editor allTags={allTags} editting={editting} onClickCallback={() => onClickCallbackFinish} />
                        </Box>
                        <Box sx={{
                            width: '75%',
                            height: '90%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mx: 2,
                            my: 2,
                        bgcolor: '#e6e2d3',
                        boxShadow: 8,

                            border: 1
                        }}>
                            Track List
                        </Box>
                    </Container>
            <Typography sx={{
                color: 'white'
            }}>
            Ideas/Notes:
            <br />
            -liner notes?
            <br />
            -display back image as well as front
            <br />
            -add title at top of page (not app bar), album title with artist?
            </Typography>
                </Box>
            
            </Fragment>
    );
}
