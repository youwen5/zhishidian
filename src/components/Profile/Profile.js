import React, { Component } from 'react';
import ProfileDetails from './ProfileDetails';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    card: {
        padding: theme.spacing(2),
    }
});

class Profile extends Component {
    constructor(props) {
        super();
        this.props = props;
    }
    render() {
        const classes = this.props;

        return(
            <Grid container spacing={4} className={classes.root} style={{padding: 24}} justify='center'>
                <Grid item xs xl={6} className={classes.card}>
                    <ProfileDetails />
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Profile);