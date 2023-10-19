import { useState } from 'react';

// this is a custom hook that levelerages the browser's session
// storage for persistant data that can live through page reloads

export const useSessionStorage = ( keyName, defaultValue ) => {
    const [ storedValue, setStoredValue ] = useState( () => {
        try {
            const value = window.sessionStorage.getItem(keyName);

            if ( value ) {
                return JSON.parse(value);
            } else {
                window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch ( err ) {
            return defaultValue;
        }
    })

    const setValue = newValue => {
        try {
            window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (e) {}
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
}
