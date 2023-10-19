import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import { Fragment, useContext } from "react";

import { UserContext, UserDispatchContext } from "../../context/UserProvider";

export default function Header() {

    const userDetails = useContext(UserContext);
    const setUserDetails = useContext(UserDispatchContext);

    const handleLogout = () => {
        // clear cookies and any other session data
        setUserDetails({ user_id: undefined });   
    }

    // if not logged in show basic header
    if ( userDetails.user_id === undefined ) {
        return (
            <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography>Vinyl Scobbler</Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            </Fragment>
        );
    }

    // if logged in show authenticated header
    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography>
                            Vinyl Scobbler - {userDetails.user_id}
                        </Typography>
                        <Button onClick={handleLogout} variant='contained'>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Fragment>
    );
}
