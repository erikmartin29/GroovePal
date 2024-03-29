import { Fragment } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

    let navigate = useNavigate();

    return (
        <Fragment>
            <Box sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#222222'
             }}>
                <div style={{ margin: 100, padding: 100 }}>
                    <h1> HOME - this is a protected page</h1>
                    <Button 
                        variant="contained" 
                        sx={{ mt: 2, mb: 3 }}
                        onClick={() => navigate('/settings', {replace: true})}
                    >Settings</Button>
                    <Button 
                        variant="contained" 
                        sx={{ mt: 2, mb: 3 }}
                        onClick={() => navigate('/discogs-test', {replace: true})}
                    >Discogs Test</Button>
                </div>
            </Box>
        </Fragment>
    );
}
