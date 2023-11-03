import { useState, useEffect, useRef } from 'react';
import { Box, Stack, Button } from '@mui/material';
import { discogs_oauth, lastfm_oauth } from '../../utils/api_provider/api_provider';
import { AuthConsumer } from '../../context/AuthProvider';

export default function SettingsPage() {

    const { username } = AuthConsumer();

    const [ discogsUrl, setDiscogsUrl ] = useState('');
    const [ lastfmUrl, setLastfmUrl ] = useState('');
    const [ loading, setLoading ] = useState(true);

    const popup_window = useRef('');

    const handlePopup = (url) => {
        window.open(url, popup_window, 'width=500,height=500');
    }

    useEffect(() => {
        const getUrls = async () => {
            discogs_oauth(username)
                .then( res => setDiscogsUrl(res.data.authurl) )
                .catch( error => console.log(error) )

            lastfm_oauth(username)
                .then( res => setLastfmUrl(res.data.authurl) )
                .catch( error => console.log(error) )
        }

        getUrls().then( () => setLoading(false) );
    }, [username])

    return loading ? <span>loading</span> : (
        <Box>
            <Stack direction='column'>
                <Button onClick={ () => handlePopup(discogsUrl)}>Link Discogs</Button>
                <Button onClick={ () => handlePopup(lastfmUrl)}>Link LastFM</Button>
            </Stack>
        </Box>
    );
}

