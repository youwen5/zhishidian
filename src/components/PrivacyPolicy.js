import React from 'react';
import { Typography, Card, Grid, Divider, Button, CardContent, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { firstHalf, secondHalf, hyperlink } from '../terms';

const useStyles = makeStyles({
    title: {
        color: '#246dff',
        textAlign: 'center',
        fontWeight: '500'
    },
    text: {
        margin: 20,
        textAlign: 'center'
    },
});

const DesktopPrivacyPolicy = () => {
    const classes = useStyles();

    return(
        <div>
            <Grid container justify='center' spacing={2}>
                <Grid item xs={12} />
                <Grid item xs={8} xl={5} md={7} lg={5} sm={7}>
                    <Card variant='outlined'>
                        <CardContent>
                            <header>
                                <Typography variant='h2' className={classes.title}>
                                    Privacy Policy
                                </Typography>
                            </header>
                            <Divider style={{margin: 20}} />
                            <Typography variant='body1' className={classes.text}>
                                {firstHalf}, <a href='https://www.zhishidian.app/'>{hyperlink}</a>, {secondHalf}
                            </Typography>
                            <Divider style={{margin: 20}} />
                            <Typography variant='body1' className={classes.text}>
                                Data we use:
                            </Typography>
                            <ul>
                                <li>
                                    Google ReCAPTCHA analytics during signup to prevent bots: <a 
                                        href='https://policies.google.com/privacy?hl=en-US' 
                                        target='__blank' 
                                        rel='noopener noreferrer'
                                        >
                                            Privacy Policy Here
                                        </a>
                                </li>
                            </ul>
                        </CardContent>
                        <CardActions>
                            <Button variant='outlined' component={Link} to={'/feed'} style={{marginLeft: 20}}>Back</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

const MobilePrivacyPolicy = () => {
    const classes = useStyles();

    return (
        <div>
            <Grid container justify='center' spacing={2}>
                <Grid item xs={12} />
                <Grid item xs={8} xl={5} md={7} lg={5} sm={7}>
                    <header>
                        <Typography variant='h2' className={classes.title}>
                            Privacy Policy
                        </Typography>
                    </header>
                    <Divider style={{margin: 20}} />
                    <Typography variant='body1' className={classes.text}>
                        {firstHalf}, <a href='https://www.zhishidian.app/'>{hyperlink}</a>, {secondHalf}
                    </Typography>
                    <Divider style={{margin: 20}} />
                    <Typography variant='body1' className={classes.text}>
                        Data we use:
                    </Typography>
                    <ul>
                        <li>
                            Google ReCAPTCHA analytics during signup to prevent bots: <a 
                                href='https://policies.google.com/privacy?hl=en-US' 
                                target='__blank' 
                                rel='noopener noreferrer'
                                >
                                    Privacy Policy Here
                                </a>
                        </li>
                    </ul>
                    <Button variant='outlined' component={Link} to={'/feed'} style={{marginLeft: 20}}>Back</Button>
                </Grid>
            </Grid>
        </div>
    )
}

const PrivacyPolicy = (props) => {
    return(
        props.width > 600
            ? <DesktopPrivacyPolicy />
            : <MobilePrivacyPolicy />
    )
}

export default PrivacyPolicy;