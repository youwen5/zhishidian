import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: theme.spacing(3),
        display: "inline"
    }
}))

const CreatePost = () => {
    const classes = useStyles();

    return (
        <div>
            <Button 
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
            >
                Create
            </Button>
        </div>
    )
}

export default CreatePost;