import { useLocalStorage } from './useLocalStorage';
import { postAuth } from '../utils/api_provider/api_provider';

export function useAuth() {

    const [ authed, setAuthed ] = useLocalStorage('authed', false);
    const [ username, setUsername ] = useLocalStorage('username', '');

    return {
        authed,
        username,
        login(credentials) {
            return new Promise( (resolve, reject) => {
                postAuth(credentials)
                .then( res => {
                    setUsername(res.data.user.user_id)
                    setAuthed(true);
                    resolve();
                }).catch( error => {
                    console.log('Error from useAuth: ', error);
                    reject(error);
                });
            });
        },
        logout() {
            return new Promise( (resolve) => {
                setUsername('');
                setAuthed(false);
                resolve();
            });
        },
    };
}

