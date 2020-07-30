import React from 'react';
import { 
    Grid, 
    Card, 
    Typography, 
    CardContent, 
    Divider, 
    TextField, 
    Button, 
    LinearProgress, 
    Slide,
    Radio,
    Avatar,
} from '@material-ui/core';
import { red, green, blue, cyan } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';
import LoadingButton from './LoadingButton';
import getUserDetails from '../databaseManagement/getUserDetails';
import createUser from '../databaseManagement/createUser';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    red: {
        backgroundColor: red[500]
    },
    blue: {
        backgroundColor: blue[500]
    },
    green: {
        backgroundColor: green[500]
    },
    cyan: {
        backgroundColor: cyan[500]
    },
    error: {
        color: red[500]
    },
}));

export default function DesktopSignup(props) {
    const classes = useStyles();

    const history = useHistory();

    const [progress, setProgress] = React.useState(0);
    const [username, setUsername] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [profileColor, setProfileColor] = React.useState('blue');
    const [bio, setBio] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const timer = React.useRef();

    React.useEffect(() => {
        return () => {
          clearTimeout(timer.current);
        };
      }, []);

    const profileColorPicker = (color) => {
        switch(color) {
            case 'blue':
                return classes.blue;
            case 'green':
                return classes.green;
            case 'red':
                return classes.red;
            case 'cyan':
                return classes.cyan;
            default:
                return classes.blue;
        }
    }

    const whiteSpaceCheck = (string) => {
        const whiteSpaceRegex = /\s/g;
        return string.replace(whiteSpaceRegex, '').length ? true : false;
    }

    const validateString = (string) => {
        const validRegex = /^[a-zA-Z0-9]*$/;
        return validRegex.test(string);
    }

    const checkUsernameAvailable = async () => {
        const response = await getUserDetails(username);
    
        if (response[0].statusCode !== 200) {
            return false;
        }
        return true;
    }

    const goToNext = async () => {
        switch(progress) {
            case 0:
                if (!firstName || !lastName || !whiteSpaceCheck(firstName) || !whiteSpaceCheck(lastName)) {
                    setErrorMessage('First or last name cannot be blank');
                } else if (!validateString(firstName) || !validateString(lastName)) {
                    setErrorMessage('Alphanumeric chars only')
                } else if (firstName.length > 25 || lastName.length > 25) {
                    setErrorMessage('Cannot be more than 25 characters')
                }
                else {
                    setProgress(progress + 1);
                    setErrorMessage('');
                }
                break;
            case 1:
                if (!username || !whiteSpaceCheck(username)) {
                    setErrorMessage('Username cannot be blank');
                } else if (!validateString(username)) {
                    setErrorMessage('Alphanumeric chars only');
                } else if (username.length > 20) {
                    setErrorMessage('May only contain 20 or less characters')
                }  else if (username.length < 3) {
                    setErrorMessage('Must be at least 3 characters');
                } else if (await checkUsernameAvailable()) {
                    setErrorMessage('Sorry, that username is taken')
                } else {
                    setProgress(progress + 1);
                    setErrorMessage('');
                }
                break;
            case 3:
                if (!bio || !whiteSpaceCheck(bio)) {
                    setErrorMessage('Enter something for your bio');
                } else if (bio.length > 200) {
                    setErrorMessage('Bio cannot be more than 200 characters');
                } else {
                    setProgress(progress + 1);
                    setErrorMessage('');
                }
                break;    
            case 4:
                if (!password || !whiteSpaceCheck(password)) {
                    setErrorMessage('Password cannot be blank');
                } else if (password.length < 8) {
                    setErrorMessage('Password must be at least 8 characters');
                } else {
                    setProgress(progress + 1);
                    setErrorMessage('');
                }
                break;
            default:
                setProgress(progress + 1);
                setErrorMessage('');
                
        }
    }

    const handleConfirmDetails = async () => {
        setLoading(true);
        
        try {
            await createUser(username, password, firstName, lastName, 'parent', profileColor, bio);

            setSuccess(true);
        } catch(error) {
            console.log(`Error occurred creating user: ${error}`);
            
        } finally {
            setLoading(false);
            timer.current = setTimeout(() => {
                history.push('/login');
            }, 1000);
            
        }
    }

    return (
        <Card variant='outlined'>
            <CardContent>
                <Grid 
                    container 
                    justify='center' 
                    alignItems='center'
                    spacing={2}
                >
                    <Grid 
                        item
                    >
                        <Typography variant='h4'>
                            Create Account
                        </Typography>
                        <Divider />
                    </Grid>
                    <Slide direction='left' in={progress === 0} exit={false} mountOnEnter unmountOnExit>
                        <div>
                            <Grid item>
                                <Typography variant='body1' align='center'>
                                    First, tell us a bit about yourself
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    margin="dense"
                                    id="firstName"
                                    label='First Name'
                                    type="text"
                                    autoFocus
                                    onChange={event => setFirstName(event.target.value ? `${event.target.value[0].toUpperCase()}${event.target.value.substring(1)}` : '')}
                                    defaultValue={firstName}
                                />
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    margin='dense'
                                    id='lastName'
                                    label='Last Name'
                                    type='text'
                                    onChange={event => setLastName(event.target.value ? `${event.target.value[0].toUpperCase()}${event.target.value.substring(1)}` : '')}
                                    defaultValue={lastName}
                                    onKeyPress={e => {
                                        if (e.key === 'Enter') {
                                            goToNext();
                                        }
                                    }}
                                />
                            </Grid>
                        </div>
                    </Slide>
                    <Slide direction='left' in={progress === 1} exit={false} mountOnEnter unmountOnExit>
                        <div>
                            <Grid item>
                                <Typography variant='body1' align='center'>
                                    Next, pick a username
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    margin='dense'
                                    id='userName'
                                    label='Username'
                                    type='text'
                                    onChange={event => setUsername(event.target.value)}
                                    defaultValue={username}
                                    onKeyPress={e => {
                                        if (e.key === 'Enter') {
                                            goToNext();
                                        }
                                    }}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item>
                            <Divider style={{marginBottom: 10, marginTop: 10}} />
                                <Typography variant='body1' overflow='wrap' align='center'>
                                    Your username is used to uniquely
                                    identify your account. You can't change it later!
                                </Typography>
                            </Grid>
                        </div>
                    </Slide>
                    <Slide direction='left' in={progress === 2} exit={false} mountOnEnter unmountOnExit>
                        <div>
                            <Grid item>
                                <Typography variant='body1' align='center'>
                                    Pick a color for your profile picture
                                </Typography>
                            </Grid>
                            <Grid item xl={12} />
                            <Grid item>
                                <div>
                                    <Grid container spacing={4} justify='center' style={{marginTop: 10}}>
                                        { ['blue', 'green', 'red', 'cyan'].map(color => (
                                            <Grid item>
                                                <Avatar className={profileColorPicker(color)}>{username ? username[0].toUpperCase() : null}</Avatar>
                                                <Radio
                                                    checked={profileColor === color}
                                                    value={color}
                                                    color='primary'
                                                    onChange={event => setProfileColor(event.target.value)}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </Grid>
                        </div>
                    </Slide>
                    <Slide direction='left' in={progress === 3} exit={false} mountOnEnter unmountOnExit>
                        <div>
                            <Grid item>
                                <Typography variant='body1' align='center'>
                                    Write something about yourself:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    margin="dense"
                                    id="bio"
                                    label='Bio'
                                    type="text"
                                    autoFocus
                                    multiline
                                    rows={4}
                                    onChange={event => setBio(event.target.value)}
                                    defaultValue={bio}
                                    error={bio.length > 200}
                                    helperText={`${bio.length}/200`}
                                />
                            </Grid>
                        </div>
                    </Slide>
                    <Slide direction='left' in={progress === 4} exit={false} mountOnEnter unmountOnExit>
                        <div>
                            <Grid item>
                                <Typography variant='body1' align='center'>
                                    Pick a secure password
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    margin='dense'
                                    id='password'
                                    label='Password'
                                    type='password'
                                    onChange={event => setPassword(event.target.value)}
                                    defaultValue={password}
                                    onKeyPress={e => {
                                        if (e.key === 'Enter') {
                                            goToNext();
                                        }
                                    }}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item>
                            <Divider style={{marginBottom: 10, marginTop: 10}} />
                                <Typography variant='body1' overflow='wrap' align='center'>
                                    Make sure your password is secure!
                                </Typography>
                                <a target='_blank' rel='noopener noreferrer' href='https://blog.avast.com/strong-password-ideas'>
                                    See: Avast Post
                                </a>
                            </Grid>
                        </div>
                    </Slide>
                    <Slide direction='left' in={progress === 5} exit={false} mountOnEnter unmountOnExit>
                        <div>
                            <Grid item>
                                <Typography variant='body1' align='center'>
                                    Finally, verify the following information is correct:
                                </Typography>
                                <Divider style={{marginTop: 10, marginBottom: 10}} />
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" align='center'>
                                    Full Name: {firstName} {lastName}
                                </Typography>
                                <Typography variant="body1" align='center'>
                                    Username: {username}
                                </Typography>
                                <Grid container justify='center'>
                                    <Grid item xl={12}>
                                        <Typography variant="body1" align='center'>
                                            Password:
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        { showPassword
                                            ? (
                                            <Typography variant='body2'>
                                                {password}
                                            </Typography>
                                            )
                                            : (
                                            <Button disableElevation onClick={() => setShowPassword(true)}>
                                                Show
                                            </Button>
                                            )
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Divider style={{marginBottom: 10, marginTop: 10}} />
                                <Typography variant='body1' overflow='wrap' align='center'>
                                    Once you're done, click the button to confirm:
                                </Typography>
                            </Grid>
                        </div>
                    </Slide>
                    <Grid item xl={8} lg={8} md={8} sm={8}>
                        { progress === 0
                            ? (

                            <Button
                                variant='outlined'
                                startIcon={<ArrowBackIcon />}
                                component={ Link }
                                to='/login'
                                onClick={() => setProgress(0)}
                            >
                                Back
                            </Button> )
                                : (
                            <Button
                                variant='outlined'
                                startIcon={<ArrowBackIcon />}
                                onClick={() => setProgress(progress - 1)}
                                disabled={success || loading}
                            >
                                Back
                            </Button>
                            )
                        }
                        <Typography variant='body1' className={classes.error}>
                            {errorMessage}
                        </Typography>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={4}>
                        { progress !== 5
                        ? (
                            <Button
                                variant='contained'
                                color='primary'
                                endIcon={<ArrowForwardIcon />}
                                onClick={goToNext}
                            >
                                Next
                            </Button>
                        )
                        : (
                            <LoadingButton success={success} loading={loading} handleConfirm={handleConfirmDetails} />
                        )   
                        }
                    </Grid>
                    <Grid item xl={11} lg={11} md={11} sm={11}>
                        <div>
                            <LinearProgress 
                                variant='determinate' 
                                value={progress !== 5 ? progress * 25 : 100} 
                            />
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}