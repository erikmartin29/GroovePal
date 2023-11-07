import { Fragment } from 'react';
import { createTheme } from '@mui/material';

//Dark Green - #618343
//Light Green - #82B74B
//Header Brown - #b9936c
//Cream - #e6e2d3
//Dark Grey - #353939

//main: '#618343'
//light: '#77985A'
//dark: '#517234'
const darkGreen = createTheme({
    palette: {
        darkGreen: {
            main: '#618343',
            light: '#517234',
            dark: '#77985A',
            contrastText: '#000000',
        },
    },
});

//main: '#82B74B'
//light: '#A9DC76'
//dark: '#6A9C38'
const lightGreen = createTheme({
    palette: {
        lightGreen: {
            main: '#82B74B',
            light: '#6A9C38',
            dark: '#A9DC76',
            contrastText: '#000000',
        },
    },
});

const headerBrown = createTheme({
    palette: {
        headerBrown: {
            main: '#b9936c',
            light: '#b9936c',
            dark: '#b9936c',
            contrastText: '#ffffff',
        },
    },
});

export { darkGreen, lightGreen, headerBrown }
