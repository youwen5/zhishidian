import React, { useState } from 'react';
import { Card, CardContent, TextField, Typography, Collapse, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import postItem from '../databaseManagement/postItem';
import { CircularProgress } from '@material-ui/core';

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
    const [author, setAuthor] = useState('');   // placeholder for author
    const [expanded, setExpanded] = useState(false);
    const [showTitleInput, setShowTitleInput] = useState(false);
    const [titleErrored, setTitleErrored] = useState(false);
    const [contentErrored, setContentErrored] = useState(false);
    const [authorErrored, setAuthorErrored] = useState(false);

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
    }
    
    const handleAuthorInputChange = (event) => {
        setAuthor(event.target.value);
        setAuthorErrored(false);
    }

    const handleFinishAnimation = () => {
        setShowTitleInput(false);
    }
    
    const whiteSpaceCheck = (string) => {
        const whiteSpaceRegex = /\s/g;
        return string.replace(whiteSpaceRegex, '').length ? true : false;
    }

    const handleCreatePost = async () => {
        if (whiteSpaceCheck(title) && whiteSpaceCheck(author) && whiteSpaceCheck(content)) {
            props.causeLoading();
            await postItem(title, author, content);
            props.causeReload();
        } else {
            !whiteSpaceCheck(title) ? setTitleErrored(true) : setTitleErrored(false);
            !whiteSpaceCheck(author) ? setAuthorErrored(true) : setAuthorErrored(false);
            !whiteSpaceCheck(content) ? setContentErrored(true) : setContentErrored(false);
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
                        helperText={titleErrored ? 'Title cannot be only whitespace' : null}
                    />
                    <TextField
                        fullWidth
                        id="author"
                        margin='dense'
                        label='Author'
                        variant='filled'    
                        onChange={handleAuthorInputChange}
                        defaultValue={author}
                        error={authorErrored}
                        helperText={authorErrored ? 'Author cannot be only whitespace' : null}
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
                                <CircularProgress 
                                variant='static' 
                                value={content.length < 1000 ? Math.ceil(content.length/10) : 100} 
                                size={20} 
                                color={content.length > 1000 ? 'secondary': 'primary'} />
                                <Typography variant='caption' className={classes.erroredText}>
                                    { content.length > 1000
                                        ? '1000 character limit reached!'
                                        : null
                                    }
                                </Typography>
                            </div>
                            <div>
                                <Button color="inherit" disabled={!title || !content || !author ? true : false} onClick={handleCreatePost}>
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