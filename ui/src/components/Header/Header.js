import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Fragment } from "react";

export default function Header(props) {

    const { activeUser } = props;

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography>Vinyl Scobbler - {activeUser}</Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </Fragment>
    );
}
