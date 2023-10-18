import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Fragment, useContext } from "react";

import { UserContext } from "../../context/UserProvider";

export default function Header() {

    const userDetails = useContext(UserContext);

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography>Vinyl Scobbler - {userDetails.user_id}</Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </Fragment>
    );
}
