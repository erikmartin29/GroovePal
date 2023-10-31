import { AppBar, Toolbar, Box, Typography, Button, Tooltip } from "@mui/material";
import { Fragment } from "react";

import { AuthConsumer } from "../../context/AuthProvider";

export default function Header() {
    const { authed, username, logout } = AuthConsumer();
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography>Vinyl Scrobbler{authed && ` - ${username}`}</Typography>
                    {authed && <Button variant="contained" onClick={logout}>Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
