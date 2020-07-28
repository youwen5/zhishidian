import React from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';

export default function DesktopLogin(props) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleUsernameChange = async (event) => {
        await setUsername(event.target.value);
    }

    const handlePasswordChange = async (event) => {
        await setPassword(event.target.value)
    }

    const handleLoginAttempt = () => {
        props.authenticate(username, password)
    }

    return(
        <Grid container justify='center' spacing={2}>
            <Grid item xs={12} xl={7}>
                <Typography variant='h4' align='center'>
                    Sign In
                </Typography>
                <Typography variant='body1' align='center'>
                    To access your account
                </Typography>
            </Grid>
            <Grid item xs={12} xl={12} />
            <Grid item xs={12} xl={10} sm={12} md={10} lg={10}>
                <TextField 
                    fullWidth 
                    variant='outlined'
                    margin="dense"
                    id="username"
                    label='Username'
                    type='text'
                    onChange={handleUsernameChange}
                    autoFocus
                    disabled={props.disable}
                />
            </Grid>
            <Grid item xs={12} xl={10} sm={12} md={10} lg={10}>
                <TextField 
                    fullWidth 
                    variant='outlined'
                    margin="dense"
                    id="password"
                    label='Password'
                    type="password"
                    onChange={handlePasswordChange}
                    disabled={props.disable}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            handleLoginAttempt();
                        }
                    }}
                />
            </Grid>
            <Grid item xs={8} xl={8} md={6} lg={8} sm={8}>
                <Button 
                    disableElevation 
                    style={{marginTop: -4}}
                    size='small'
                    variant='outlined'
                    disabled={props.disable}
                >
                    Create Account
                </Button>
            </Grid>
            <Grid item xs={4} xl={2} md={4} lg={2} sm={4}>
                <Button 
                    disableElevation 
                    style={{marginLeft: -5, marginTop: -4}}
                    size='small'
                    variant='contained'
                    color='primary'
                    onClick={handleLoginAttempt}
                    disabled={props.disable}
                >
                    Next
                </Button>
            </Grid>
        </Grid>
    )
}