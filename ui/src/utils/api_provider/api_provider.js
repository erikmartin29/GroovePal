import axios from 'axios';

const url = 'http://localhost:8282';

export const axiosClient = axios.create({
    baseURL: `${url}/api/v1/`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true // allow the browser to send cookies to the API domain
});

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


