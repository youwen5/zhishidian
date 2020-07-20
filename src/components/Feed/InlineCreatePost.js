import React, { useState } from 'react';
import { Card, CardContent, TextField, Typography, Collapse, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        // marginRight: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
}));

export default function InlineCreatePost(props) {
    const classes = useStyles();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');   // placeholder for author
    const [expanded, setExpanded] = useState(false);
    const [showTitleInput, setShowTitleInput] = useState(false);

    const handleContentInputChange = (event) => {
        setContent(event.target.value);
        if (event.target.value) {
            setExpanded(true);
            setShowTitleInput(true)
        } else {
            setExpanded(false);
        }
    }

    const handleFinishAnimation = () => {
        setShowTitleInput(false);
    }

    return(
        <>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h6">
                    What's going on?
                </Typography>
                 <Collapse in={expanded} timeout='auto' collapsedHeight='70px' onExited={handleFinishAnimation}>
                    { showTitleInput
                    ? (
                    <>
                    <TextField
                        fullWidth
                        id="title"
                        margin='dense'
                        label='Enter a title for your post'
                        variant='filled'
                    />
                    <TextField
                        fullWidth
                        id="author"
                        margin='dense'
                        label='Author'
                        variant='filled'
                    />
                    </>
                    ) : null }
                    <TextField
                        fullWidth
                        margin="dense"
                        id="content"
                        label='Make a post...'
                        type="content"
                        variant="outlined"
                        multiline
                        rows={showTitleInput ? 12 : 2}
                        onChange={handleContentInputChange}
                    />
                 </Collapse>
            </CardContent>
        </Card>
        </>
    );
}