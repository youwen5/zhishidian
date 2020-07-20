import React, { Component, Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import LinearIndeterminate from '../LinearIndeterminate';
import Post from './Post';
import CreatePost from './CreatePost.js';
import getAll from '../databaseManagement/getAll';
import GetMore from './GetMore';
import RefreshButton from './RefreshButton';
import { withStyles } from '@material-ui/core/styles';
import SearchButton from './SearchButton';
import SearchBox from './SearchBox';
import Alert from '../Alert';
import InlineCreatePost from './InlineCreatePost';
import CircularIndeterminate from '../CircularIndeterminate';

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
        },
    },
    post: {
        padding: theme.spacing(2)
    }
})

class Feed extends Component {
    state = {
        posts: [],
        startId: 1,
        morePoststoFetch: true,
        errorFetching: false,
        searchString: '',
        loadingNewPosts: false,
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
        this.setState({ morePoststoFetch: true });

        this.getPosts();
    }
    handleGetMorePosts = async (startId) => {
        try {
            this.setState({ loadingNewPosts: true })
            const newPosts = await getAll(startId);

            if (newPosts.length >= 21) {
                newPosts.pop();
            } else {
                this.setState({ morePoststoFetch: false });
            }
            this.setState({ posts: [...this.state.posts, ...newPosts] });
            this.setState({ loadingNewPosts: false });
        } catch {
            console.log('error occurred fetching');
            this.handleNotification('error', 'Error fetching more posts');
            this.setState({ errorFetching: true });
        }
    }
    onSearchInputChange = (searchString) => {
        this.setState({ searchString: searchString });
    }
    handleSearch = async () => {
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
                        {/* <div className={classes.inlineSearch}>
                            <SearchBox onChange={this.onSearchInputChange} />
                            <Search onClick={this.handleNotification} />
                            <RefreshButton handleRefresh={this.handleRefresh} component="div" color="primary" />
                        </div> */}
                        {/* <div className={classes.inlineButton}>
                        <CreatePost 
                         refreshPage={this.handleRefresh} 
                         component="div" display="inline" 
                         pushNotification={this.handleNotification} 
                         causeLoading={this.causeLoading}
                         />

                        </div> */}
                        <Grid container spacing={2} style={{padding: 24}} justify='center'>
                            <Grid item xs={12} xl={5}>
                                <Grid container spacing={2}>
                                    <Grid item xs xl={9}>
                                        <SearchBox onChange={this.onSearchInputChange} />
                                    </Grid>
                                    <Grid item xs xl={3}>
                                        <div className={classes.inlineSearch} style={{paddingTop: 20}}>
                                                <SearchButton onClick={this.handleNotification} />
                                                <RefreshButton handleRefresh={this.handleRefresh} component="div" color="primary" />
                                        </div>
                                    </Grid>
                                </Grid>
                                {/* <Card variant="outlined">
                                    <CardContent>
                                        <Grid container spacing={2} style={{paddingLeft: 12}}>
                                            <Grid container xs xl={8}>
                                                <SearchBox onChange={this.onSearchInputChange} />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card> */}
                            </Grid>
                            {/* <Grid item xs xl={2}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <div className={classes.inlineSearch}>
                                            <Search onClick={this.handleNotification} />
                                            <RefreshButton handleRefresh={this.handleRefresh} component="div" color="primary" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid> */}
                            <Grid item xs xl={8} />
                            <Grid item xs={12} xl={5}>
                                <InlineCreatePost />
                            </Grid>
                            <Grid item xs={12} xl={8} />
                            { 
                                /* sm={6} lg={4}*/
                                this.state.posts.map(currentPost => (
                                    <Fragment>
                                    <Grid item xs={12} xl={5} className={classes.post}>
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
                                    <Grid item xl={8} />
                                    </Fragment>
                                ))
                            }
                        </Grid>
                        {
                            this.state.morePoststoFetch
                             ? this.state.loadingNewPosts
                                 ? <CircularIndeterminate />
                                 : (
                                <>
                                    <GetMore 
                                    startId={this.state.posts[this.state.posts.length - 1].id} 
                                    getMorePosts={this.handleGetMorePosts} 
                                    causeLoading={this.loadMorePostsLoading}
                                    />
                                </>
                                )
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