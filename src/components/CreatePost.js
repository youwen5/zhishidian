import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
const config = require('./config.json');

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: theme.spacing(3),
    },
    createPostForm: {
        
    }
}))

const CreatePost = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [author, setAuthor] = React.useState(''); // placeholder for author
    const [titleErrored, setTitleError] = React.useState(false);
    const [contentErrored, setContentError] = React.useState(false);
    const [authorErrored, setAuthorError] = React.useState(false); // placeholder for author

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

        clearErrors();
    };

    const handleTitleInputChange = (titleInput) => {
        setTitle(titleInput.target.value);
    };

    const handleContentInputChange = (contentInput) => {
        setContent(contentInput.target.value);
    };

    const handleAuthorInputChange = (authorInput) => { // placeholder for author
        setAuthor(authorInput.target.value);
    }

    const clearErrors = () => {
        setTitleError(false);
        setContentError(false);
        setAuthorError(false); // placeholder for author
    };

    const handleAddPost = async () => {
        try {
            const params = {
                "title": title,
                "author": author,
                "content": content,
            };
            await axios.post(`${config.api.invokeUrl}/posts/${title}`, params);
        } catch(error) {
            console.log("error occurred while posting: " + error);
        } finally {
            props.refreshPage();
        }
    }

    const handlePostCreation = () => {
        if (!title || !content || !author) {
            setTitleError(!title ? true : false);
            setContentError(!content ? true : false);
            setAuthorError(!author ? true : false); // placeholder for author
        } else {
            // put api calls here
            handleAddPost();

            setTitle('');
            setContent('');
            setAuthor('');
    
            handleClose();
        }
    }

    return (
        <div>
        <Fragment>
            <Button 
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick= {handleClickOpen}
            >
                Create
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.createPostForm} fullWidth maxWidth='md'>
                <DialogTitle id="form-dialog-title">Create Post</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Create a new public post
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="title"
                    variant="filled"
                    onChange={handleTitleInputChange}
                    error={titleErrored ? true : false}
                    helperText={titleErrored ? 'Enter a title' : null}
                    defaultValue={title}
                    fullWidth
                />
                <TextField // placeholder for author
                    margin="dense"
                    id="author"
                    label="Author"
                    type="title"
                    variant="filled"
                    onChange={handleAuthorInputChange}
                    error={authorErrored ? true : false}
                    helperText={authorErrored ? 'Enter your name' : null}
                    defaultValue={author}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="content"
                    label="Post Content"
                    type="content"
                    variant="outlined"
                    multiline
                    rows={12}
                    onChange={handleContentInputChange}
                    error={contentErrored ? true : false}
                    helperText={contentErrored ? 'Enter some text for the body of your post' : null}
                    defaultValue={content}
                    fullWidth
                />
                <DialogContentText variant="caption">
                    {`Char count: ${content.length}`}
                </DialogContentText>
                {/* <Typography variant="caption">{`Char count: ${content.length}`}</Typography> */}
                </DialogContent>
                <DialogActions>
                <Button onClick={() => {
                    setTitle('');
                    setContent('');
                    handleClose()
                    clearErrors()
                    }} 
                    color="primary">
                    Cancel
                </Button>
                <Button onClick={handlePostCreation} color="primary">
                    Create
                </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
        </div>
    )
}

export default CreatePost;