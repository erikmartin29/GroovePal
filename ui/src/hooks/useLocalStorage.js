import { useState } from 'react';

// this is a custom hook that levelerages the browser's local
// storage for persistant data that can live through page reloads

export const useLocalStorage = ( keyName, defaultValue ) => {
    const [ storedValue, setStoredValue ] = useState( () => {
        try {
            const value = window.localStorage.getItem(keyName);

            if ( value ) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch ( err ) {
            return defaultValue;
        }
    })

    const setValue = newValue => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (e) {}
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
}
