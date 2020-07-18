import React, { Component, Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import LinearIndeterminate from '../LinearIndeterminate';
import Post from './Post';
import CreatePost from './CreatePost.js';
import getAll from '../databaseManagement/getAll';
import GetMore from './GetMore';
import RefreshButton from './RefreshButton';
import { withStyles } from '@material-ui/core/styles';
import Search from './Search';
import SearchBox from './SearchBox';
import Alert from '../Alert';

const styles = theme => ({
    inlineButton: {
        '& > *': {
            display: "inline"
        },
    },
    errorFetching: {
        '& > *': {
            margin: theme.spacing(2)
        }
    },
    reachedTheEnd: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4)
    },
    inlineSearch: {
        '& > *': {
            display: "inline",
            marginLeft: theme.spacing(3),
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        }
    },
})

class Feed extends Component {
    state = {
        posts: [],
        startId: 1,
        morePoststoFetch: true,
        errorFetching: false,
        searchString: '',
        notificationActive: {
            isActive: false,
            notifContent: '',
            notifType: '',
            timeout: 3000
        }
    }
    constructor() {
        super();
        this.getPosts();
        this.handleRefresh = this.handleRefresh.bind(this);
    }
    getPosts = async () => {
        try {
            const response = await getAll();
            this.setState({ posts: response });
            if (this.state.errorFetching) {
                this.setState({ errorFetching: false });
            }
        } catch(error) {
            console.log(`An error occurred while displaying posts`);
            this.setState({ errorFetching: true })
            this.handleNotification('error', 'Unexpected error fetching posts');
        }
    }
    componentDidMount = () => {
        this.getPosts();
    }
    handleRefresh = () => {
        this.setState({ posts: [] });

        this.getPosts();
    }
    handleGetMorePosts = async (startId) => {
        try {
            const newPosts = await getAll(startId);

            if (newPosts.length >= 21) {
                newPosts.pop();
            } else {
                this.setState({ morePoststoFetch: false });
            }
            this.setState({ posts: [...this.state.posts, ...newPosts] });
        } catch {
            console.log('error occurred fetching');
            this.setState({ errorFetching: true });
        }
    }
    onSearchInputChange = (searchString) => {
        this.setState({ searchString: searchString });
    }
    handleSearch = async () => {
        console.log(this.state.searchString);
        this.handleNotification('error', 'test');
    }
    handleNotification = async (variant, message, timeout=3000) => {
        const params = {
            isActive: true,
            notifContent: message,
            notifType: variant,
            timeout: timeout
        }

        await this.setState({ notificationActive: params });
    }
    handleStopNotification = async () => {
        this.setState({ notificationActive: {
            isActive: false,
            notifContent: '',
            notifType: '',
            timeout: 3000
        } });
    }   
    causeLoading = async () => {
        this.setState({ posts: [] });
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Alert
                 severity={this.state.notificationActive.notifType}
                 autoHide={3000} 
                 isOpen={this.state.notificationActive.isActive} 
                 onClose={this.handleStopNotification}>
                 {this.state.notificationActive.notifContent}
                </Alert>
                { this.state.posts && this.state.posts.length > 0 ? (
                    <div>
                        <div className={classes.inlineSearch}>
                            <SearchBox onChange={this.onSearchInputChange} />
                            <Search onClick={this.handleNotification} />
                        </div>
                        <div className={classes.inlineButton}>
                        <CreatePost 
                         refreshPage={this.handleRefresh} 
                         component="div" display="inline" 
                         pushNotification={this.handleNotification} 
                         causeLoading={this.causeLoading}
                         />
                        <RefreshButton handleRefresh={this.handleRefresh} component="div" display="inline" color="primary" />
                        </div>
                        <Grid container spacing={4} style={{padding: 24}}>
                            { 
                                this.state.posts.map(currentPost => (
                                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                                        <Post 
                                        post={
                                            {
                                                "title": currentPost.title,
                                                "author": currentPost.author,
                                                "content": currentPost.content,
                                                "date": currentPost.time,
                                                "pfColor": currentPost.pfColor
                                            }
                                        } 
                                        pushNotification={this.handleNotification}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        {
                            this.state.morePoststoFetch
                             ? <GetMore startId={this.state.posts[this.state.posts.length - 1].id} getMorePosts={this.handleGetMorePosts} />
                             : <Typography variant="body1" align='center' className={classes.reachedTheEnd}>You've reached the end</Typography>
                        }
                    </div>
                ) : <div>
                        {
                            this.state.errorFetching
                             ? (
                                 <div className={classes.errorFetching}>
                                    <Fragment>
                                    <Typography variant="inherit">Unexpected error occurred. Maybe try reloading?</Typography>
                                    <RefreshButton handleRefresh={this.handleRefresh} />
                                    </Fragment>
                                 </div>
                               )
                             : <LinearIndeterminate />
                        }
                    </div> }
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Feed);