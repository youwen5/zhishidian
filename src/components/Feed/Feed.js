import React, { Component, Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import LinearIndeterminate from '../LinearIndeterminate';
import Post from './Post';
import getAll from '../databaseManagement/getAll';
import queryItem from '../databaseManagement/queryItem';
import GetMore from './GetMore';
import RefreshButton from './RefreshButton';
import { withStyles } from '@material-ui/core/styles';
import UpperActions from './UpperActions';
import Alert from '../Alert';
import InlineCreatePost from './InlineCreatePost';
import CircularIndeterminate from '../CircularIndeterminate';
import history from '../history';

const styles = theme => ({
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
        },
        requestType: '',
        retryAttempts: 0
    }
    constructor() {
        super();
        this.getPosts();
        this.handleRefresh = this.handleRefresh.bind(this);
    }
    getPosts = async () => {
        try {
            let response;

            if (history.location.search) {
                response = await queryItem(history.location.search.split('=')[1].replace(/%20/g, ' '));
                this.setState({ requestType: 'query' });
            } else {
                response = await getAll();
                this.setState({ requestType: 'getAll' });
            }

            if (response.length) {
                this.setState({ posts: response });
            } else if (this.state.requestType === 'query') {
                response = await getAll();
                this.setState({ posts: response });
                this.handleNotification('warning', 'No results found for that search');
            }

            if (this.state.errorFetching) {
                this.setState({ errorFetching: false });
            }
        } catch(error) {
            if (this.state.retryAttempts < 10) {
                this.getPosts();
            } else {
                this.setState({ errorFetching: true })
                this.handleNotification('error', 'Unexpected error fetching posts');
            }
            console.log(`An error occurred while displaying posts`);
            this.setState({ retryAttempts: this.state.retryAttempts + 1 });
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
            const newPosts = history.location.search
            ? await queryItem(history.location.search.split('=')[1].replace(/%20/g, ' '), startId)
            : await getAll(startId);
            
            if (newPosts.length >= 21) {
                newPosts.pop();
            } else {
                this.setState({ morePoststoFetch: false });
            }
            this.setState({ posts: [...this.state.posts, ...newPosts] });
            this.setState({ loadingNewPosts: false });
        } catch {
            if (this.state.retryAttempts < 10) {
                this.getPosts();
            } else {
                this.setState({ errorFetching: true })
                this.handleNotification('error', 'Error occurred displaying more posts');
            }
            console.log(`An error occurred while displaying posts`);
            this.setState({ retryAttempts: this.state.retryAttempts + 1 });
        }
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
    updatePosts = async (newPosts) => {
        this.setState({ posts: newPosts });
    }
    clearQueryStrings = async () => {
        try {
            history.push({
                search: ``
            });
        } catch(error) {
            console.log(error);
        }
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
                        <Grid container spacing={2} style={{padding: 24}} justify='center'>
                            <Grid item xs={12} xl={5} lg={5} md={5} sm={5}>
                                <UpperActions 
                                causeReload={this.handleRefresh} 
                                pushNotification={this.handleNotification}
                                updatePosts={this.updatePosts}
                                getCurrentPosts={() => this.state.posts}
                                getNewPosts={this.getPosts}
                                requestType={this.state.requestType}
                                />
                            </Grid>
                            <Grid item xs xl={8} lg={8} md={8} sm={8} />
                            <Grid item xs={12} xl={5} lg={5} md={5} sm={5}>
                                <InlineCreatePost
                                causeReload={this.handleRefresh}
                                causeLoading={this.causeLoading}
                                clearQueryStrings={this.clearQueryStrings}
                                pushNotification={this.handleNotification}
                                username={this.props.username}
                                userid={this.props.userid}
                                />
                            </Grid>
                            <Grid item xs={12} xl={8} md={8} sm={8} />
                            { 
                                /* sm={6} lg={4}*/
                                this.state.posts.map(currentPost => (
                                    <Fragment>
                                    <Grid item xs={12} xl={5} md={5} sm={5} className={classes.post}>
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
                                    <Grid item xl={8} md={8} sm={8} />
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