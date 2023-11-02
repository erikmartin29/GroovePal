import { AppBar, Toolbar, Box, Typography, Button, Tooltip, Menu, MenuItem } from "@mui/material";
import { Fragment, useState } from "react";

import { useNavigate } from 'react-router-dom';

import { AuthConsumer } from "../../context/AuthProvider";

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
    
    return (
            <Fragment>
            <Box sx={{
                flexGrow: 1
            }}>
            <AppBar position='static'>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <h2>Vinyl Scrobbler</h2>
                    <Typography>
                        { 
                            authed && ` - ${username}`
                        }
                    </Typography>
            
            <Box>
            <Button
                sx={{
                    color: 'white'
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
                        <Button sx={{
                            color: 'white'
                        }}
                            variant="outlined"
                            color="inherit"
                            onClick={() => navigate('/login', {replace: true})}
                        >
                            Login
                        </Button>
                        <Button sx={{
                            color: 'black'
                        }}
                            variant="contained"
                            color="inherit"
                            onClick={() => navigate('/signup', {replace: true})}
                        >
                            Sign Up
                        </Button>
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
