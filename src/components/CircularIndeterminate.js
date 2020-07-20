import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    }
}));

const CircularIndeterminate = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress {...props} />
        </div>
    )
};

export default CircularIndeterminate;