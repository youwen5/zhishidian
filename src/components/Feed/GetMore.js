import React from 'react';
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    button: {
        left: "50%",
        transform: "translateX(-50%)",
    }
});

export default function GetMore(props) {
    const classes = useStyles();

    const handleClick = () => {
        props.getMorePosts(props.startId);
        console.log(props.startId);
    }

    return(
    <IconButton aria-label="get more" className={classes.button} onClick={handleClick}>
        <ExpandMoreIcon />
    </IconButton>
    );
}