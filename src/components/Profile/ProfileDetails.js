import React, { Component } from 'react';
import { Card, CardActions, CardContent, CardHeader, Avatar, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
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
    }
    render() {
        const { classes } = this.props;

        return(
            <Card variant="outlined" className={classes.root}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="profile" className={classes.avatar} variant="rounded">
                        <Typography variant="h1">
                            Y
                        </Typography>
                    </Avatar>
                    }
                />
            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ProfileDetails);