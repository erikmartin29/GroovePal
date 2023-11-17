import axios from 'axios';
import { AuthConsumer } from '../../context/AuthProvider';

const url = 'http://localhost:8282';

export const axiosClient = axios.create({
    baseURL: `${url}/api/v1/`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true // allow the browser to send cookies to the API domain
});

// gracefully handle 401 errors, when jwt token has expired
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => { 
        console.log('I see you encountered an error');
        const { logout } = AuthConsumer();
        if ( error.response.status === 401 ) {
            logout();
            window.location.href = '/login'
        }
    return Promise.reject(error);
    }
)

// check that token has not expired
export function keepAlive() {
    return axiosClient.get('/validate/')
}

export function postAuth(payload) {
    return axiosClient.post('/login/', payload);
}

export function signUp(payload) { 
    return axiosClient.post('/login/new_user/', payload);
}

export function validUsername(username) {
    return axiosClient.get(`/login/validate?user_id=${username}`);
}

export function discogs_oauth(username) {
    return axiosClient.get(`/discogs/auth/${username}`);
}

export function lastfm_oauth(username) {
    return axiosClient.get(`/lastfm/auth/${username}`);
}

export function getDiscogsCollection(username) { 
    return axiosClient.post(`/discogs/data/collection-info`, { user_id: username });
}

export function getDiscogsRelease(releaseID, username) { 
    return axiosClient.post(`/discogs/data/release/${releaseID}`, { user_id: username });
}

export function getDiscogsReleaseImage(releaseID, username) { 
    return axiosClient.post(`/discogs/data/release-image/${releaseID}`, { user_id: username });
}

export function bulkScrobble(username, track_list, image_url) {
    return axiosClient.post(`/lastfm/scrobble`, { user_id: username, image_url: image_url, scrobble_list: track_list })
}

export function getPlays(username) {
    return axiosClient.get(`/lastfm/get-scrobbles/${username}`)
}

