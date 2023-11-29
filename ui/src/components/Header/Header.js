import { AppBar, Toolbar, Box, Typography, Button, Tooltip, Menu, MenuItem, ThemeProvider } from "@mui/material";
import { Fragment, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthConsumer } from "../../context/AuthProvider";
import Avatar from '@mui/material/Avatar';
import AlbumIcon from '@mui/icons-material/Album';



export default function Header() {
    const { authed, username, logout } = AuthConsumer();
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
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
                    display: 'block',
                    flexGrow: 1,
                }}>
                <AppBar position='static'>
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        bgcolor: '#141414'
                    }}>
                        <a style={{ textDecoration: 'none', color: 'white' }} href='/'><h2>GroovePal</h2></a>
                        <Box 
                            sx={{
                                width:'80%',
                                display: 'flex',
                                justifyContent: 'right'
                            }}
                        >
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
                        {
                            authed && 
                            <Avatar sx={{ bgcolor: "#141414" }}>
                                <AlbumIcon />
                            </Avatar>
                        }
                        </Button>
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
                                    logout();
                                    handleClose();
                                }}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </Fragment>
    );
}
