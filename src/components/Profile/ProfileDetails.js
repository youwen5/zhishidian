import React, { Component } from 'react';
import { Card, CardContent, Avatar, Typography, Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    profileName: {
        // marginLeft: 4
    },
    avatar: {
        backgroundColor: red[500],
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

        return(
            <Card variant="outlined" className={classes.root}>
                <CardContent>
                    <Grid container className={classes.root} justify={'flex-start'} spacing={2}>
                        <Grid item>
                            <Avatar aria-label="profile" className={classes.avatar} variant='rounded'>
                                <Typography variant='h1'>
                                    YW
                                </Typography>
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} xl>
                            <div className={classes.profileName}>
                                <Typography variant='h5'>
                                    {this.props.userDetails.username}
                                </Typography>
                                <Typography variant='body1'>
                                    Youwen Wu
                                </Typography>
                                <Typography variant='body2' color='textSecondary'>
                                    Student
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs xl={12}>
                            <Typography variant='subtitle1' style={{fontWeight: 500}}>
                                Bio:
                            </Typography>
                            <Typography variant='body1' style={{wordWrap: 'break-word'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra, justo a posuere vulputate, massa augue feugiat tellus, placerat tristique dui ligula quis mi. Sed lobortis commodo felis, sit amet egestas tellus pretium et. Suspendisse convallis venenatis orci, luctus consequat lacus varius eget. Curabitur sit amet eleifend augue. Sed cursus pulvinar lacus, in ultricies lorem. Praesent rhoncus lacinia quam id interdum. Quisque maximus nisl id vestibulum tempus. Curabitur eu malesuada lacus, a tempus ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Nunc hendrerit venenatis nisi. Donec condimentum nec magna at volutpat. Ut ex augue, bibendum pharetra sem nec, malesuada convallis metus.
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ProfileDetails);