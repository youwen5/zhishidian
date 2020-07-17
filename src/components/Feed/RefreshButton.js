import React from 'react';
import { IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        marginLeft: theme.spacing(3),
    }
}));

export default function RefreshButton(props) {
    const classes = useStyles();

    return(
    <IconButton onClick={props.handleRefresh} className={classes.button}>
        <RefreshIcon />
    </IconButton>
    );
}