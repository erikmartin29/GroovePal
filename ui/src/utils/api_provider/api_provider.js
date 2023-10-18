import axios from 'axios';

const url = 'http://localhost:8282';

export const axiosClient = axios.create({
    baseURL: `${url}/api/v1/`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export function postAuth(payload) {
    return axiosClient.post('/login/', payload);
}


