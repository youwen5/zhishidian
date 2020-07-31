import React, { useState } from 'react';
import { Card, CardContent, TextField, Typography, Collapse, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import postItem from '../databaseManagement/postItem';
import { CircularProgress, Divider } from '@material-ui/core';

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
    erroredText: {
        color: 'red'
    }
}));

export default function InlineCreatePost(props) {
    const classes = useStyles();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [showTitleInput, setShowTitleInput] = useState(false);
    const [titleErrored, setTitleErrored] = useState(false);
    const [contentErrored, setContentErrored] = useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = useState('');

    const handleContentInputChange = (event) => {
        setContent(event.target.value);
        setContentErrored(false);

        if (event.target.value) {
            setExpanded(true);
            setShowTitleInput(true)
        } else {
            setExpanded(false);
        }
    }

    const handleTitleInputChange = (event) => {
        setTitle(event.target.value);
        setTitleErrored(false);
        if (event.target.value.length > 20) {
            setTitleErrorMessage('Title cannot be more than 20 characters!')
            setTitleErrored(true);
        }
    }

    const handleFinishAnimation = () => {
        setShowTitleInput(false);
    }
    
    const whiteSpaceCheck = (string) => {
        const whiteSpaceRegex = /\s/g;
        return string.replace(whiteSpaceRegex, '').length ? true : false;
    }

    const handleCreatePost = async () => {
        if (whiteSpaceCheck(title) && whiteSpaceCheck(content) && title.length <= 20 && content.length <= 400) {
            try {
                props.causeLoading();
                await postItem(title, props.username, content, props.userid);
                props.causeReload();
                props.clearQueryStrings();
                props.pushNotification('success', 'Post created successfully');
            } catch(error) {
                console.log(`Error occurred posting: ${error}`);
                props.pushNotification('error', 'Error occurred creating post');
            }
        } else if (!whiteSpaceCheck(title)) {
            setTitleErrorMessage('Title cannot just be whitespace')
            setTitleErrored(true);
        } else {
            setContentErrored(true);
        }

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
                        onChange={handleTitleInputChange}
                        defaultValue={title}
                        error={titleErrored}
                        helperText={titleErrored ? titleErrorMessage : null}
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
                        error={contentErrored}
                        helperText={contentErrored ? 'Content cannot be only whitespace' : null}
                    />
                    { showTitleInput
                    ? (
                        <>
                            <div>
                                <Divider style={{marginBottom: 5}} />
                                <CircularProgress 
                                variant='static' 
                                value={content.length < 400 ? Math.ceil(content.length/4) : 100} 
                                size={40} 
                                color={content.length > 400 ? 'secondary': 'primary'} />
                                <Divider />
                                <Typography variant='caption' className={classes.erroredText}>
                                    { content.length > 400
                                        ? '400 character limit reached!'
                                        : null
                                    }
                                </Typography>
                            </div>
                            <div>
                                <Button color="inherit" disabled={!title || !content || title.length > 20 || content.length > 400 ? true : false} onClick={handleCreatePost}>
                                    Create
                                </Button>
                            </div>
                        </>
                    ) : null
                    }
                 </Collapse>
            </CardContent>
        </Card>
        </>
    );
}