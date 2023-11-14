import { AppBar, Toolbar, Box, Typography, Button, Tooltip, Menu, MenuItem, ThemeProvider } from "@mui/material";
import { Fragment, useState } from "react";

import { useNavigate } from 'react-router-dom';

import { AuthConsumer } from "../../context/AuthProvider";

import { darkGreen, lightGreen, headerBrown } from '../ColorPalette';


export default function Header() {
    const { authed, username, logout } = AuthConsumer();
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
      };
    
    let navigate = useNavigate();
    
    //Claire's Changes and Notes:
    //added a login/sign up button, and added a dropdown menu on the username (currently a placeholder until I can figure out how to login)
    //username menu will switch places with the Login/Signup buttons after the user logs in, currently always active for ease of use and also because I can't actually login yet for some reason
    //may want to add other navigation buttons to pages so not all is in drop down menu?
    //do we want a search bar so people could look for albums?
    //add breadcrumbs?
    
    //Login Button colors
    //6B914A
    //405d27
    //618343 : current
    
    return (
            <Fragment>
            <Box sx={{
                flexGrow: 1
            }}>
            <AppBar position='static'>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: '#b9936c'
                }}>
                    <h2>Vinyl Scrobbler</h2>
                    <Typography>
                        { 
                            authed && ` - ${username}`
                        }
                    </Typography>
            
            <Box>
            <ThemeProvider theme={headerBrown}>
            <Button
                sx={{
                    color: 'white',
                }}
                color="inherit"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                username
              </Button>
            </ThemeProvider>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                >
                <MenuItem onClick={() => {
                    handleClose();
                    navigate('/home', {replace: true});
                }}>
                    Home
                </MenuItem>
            <MenuItem onClick={() => {
                handleClose();
                navigate('/profile', {replace: true})
            }}
            >
                Profile
            </MenuItem>
            <MenuItem onClick={() => {
                handleClose();
                navigate('/collection', {replace: true})
            }}
                >
                    Collection
                </MenuItem>
            <MenuItem onClick={() => {
                handleClose();
                navigate('/settings', {replace: true})
            }}
            >
                Settings
            </MenuItem>
                <MenuItem onClick={() => {
                    handleClose();
                }}>
                    Logout
                </MenuItem>
              </Menu>
            </Box>
            
                    <Box sx={{
                        width: 250,
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'space-evenly'
                    }}>
            <ThemeProvider theme={darkGreen}>
                        <Button sx={{
                            bgcolor: '#618343',
                            color: 'black'
                        }}
                            variant="contained"
                            color="darkGreen"
                            onClick={() => navigate('/login', {replace: true})}
                        >
                            Login
                        </Button>
                        </ThemeProvider>
            <ThemeProvider theme={lightGreen}>
                        <Button sx={{
                            bgcolor: '#82B74B',
                            color: 'black'
                        }}
                            variant="contained"
                            color="lightGreen"
                            onClick={() => navigate('/signup', {replace: true})}
                        >
                            Sign Up
                        </Button>
            </ThemeProvider>
                    </Box>
                    {
                        authed &&
                        <Button variant="contained" onClick={logout}
                        >
                            Logout
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
            </Fragment>
    );
}
