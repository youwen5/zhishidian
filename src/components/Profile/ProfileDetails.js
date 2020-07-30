import React, { Component } from 'react';
import { Card, CardContent, Avatar, Typography, Grid } from '@material-ui/core';
import { red, blue, green, cyan } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    profileName: {
        // marginLeft: 4
    },
    red: {
        backgroundColor: red[500],
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
    blue: {
        backgroundColor: blue[500],
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
    green: {
        backgroundColor: green[500],
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
    cyan: {
        backgroundColor: cyan[500],
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
});

class ProfileDetails extends Component {
    constructor(props) {
        super();
        this.state = {
            
        }
        this.props = props;
    }

    

    render() {
        const { classes } = this.props;

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

        return(
            <Card variant="outlined" className={classes.root}>
                <CardContent>
                    <Grid container className={classes.root} justify={'flex-start'} spacing={2}>
                        <Grid item>
                            <Avatar aria-label="profile" className={profileColorPicker(this.props.userDetails.profileColor)} variant='rounded'>
                                <Typography variant='h1'>
                                    {this.props.userDetails.username ? this.props.userDetails.username[0].toUpperCase() : null}
                                </Typography>
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} xl>
                            <div className={classes.profileName}>
                                <Typography variant='h5'>
                                    {this.props.userDetails.username}
                                </Typography>
                                <Typography variant='body1'>
                                    {this.props.userDetails.firstName} {this.props.userDetails.lastName}
                                </Typography>
                                {/* <Typography variant='body2' color='textSecondary'>
                                    Student
                                </Typography> */}
                            </div>
                        </Grid>
                        <Grid item xs xl={12}>
                            <Typography variant='subtitle1' style={{fontWeight: 500}}>
                                Bio:
                            </Typography>
                            <Typography variant='body2' style={{wordWrap: 'break-word'}}>
                                {this.props.userDetails.bio}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ProfileDetails);