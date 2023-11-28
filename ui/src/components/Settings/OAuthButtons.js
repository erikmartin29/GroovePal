import { useState, useEffect, useRef } from 'react';
import { Box, Stack, Button } from '@mui/material';
import { discogs_oauth, lastfm_oauth } from '../../utils/api_provider/api_provider';
import { AuthConsumer } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { green } from '@mui/material/colors';

export default function OAuthButtons() {

    const { username } = AuthConsumer();

    let navigate = useNavigate();

    const [discogsUrl, setDiscogsUrl] = useState('');
    const [lastfmUrl, setLastfmUrl] = useState('');
    const [loading, setLoading] = useState(true);

    const [isDiscogsConnected, setIsDiscogsConnected] = useState(false);
    const [isLastFMConnected, setIsLastFMConnected] = useState(false);

    const popup_window = useRef('');

    const handlePopup = (url) => {
        window.open(url, popup_window, 'width=500,height=500');

    }

    useEffect(() => {
        const getUrls = async () => {
            discogs_oauth(username)
                .then(res => {
                    setDiscogsUrl(res.data.authurl)
                    //setIsDiscogsConnected(true)
                })
                .catch(error => console.log(error))

            lastfm_oauth(username)
                .then(res => {
                    setLastfmUrl(res.data.authurl)
                    //setIsLastFMConnected(true)
                })
                .catch(error => console.log(error))
        }

        getUrls().then(() => setLoading(false));
    }, [username])

    return (
        <Box>
            <Stack direction='column'>
                <Stack direction='row' alignItems='center'>
                    <Button
                        variant="contained"
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
                        onClick={() => handlePopup(discogsUrl)}>
                        Link Discogs
                    </Button>
                    {isDiscogsConnected ? <CheckIcon sx={{ paddingLeft: 2, color: green[500] }} /> : null}
                </Stack>

                <Stack direction='row' alignItems='center'>
                    <Button
                        variant="contained"
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
                        onClick={() => handlePopup(lastfmUrl)}>
                        Link LastFM
                    </Button>
                    {isLastFMConnected ? <CheckIcon sx={{ paddingLeft: 2, color: green[500] }} /> : null}
                </Stack>

            </Stack>
        </Box>
    );

}

