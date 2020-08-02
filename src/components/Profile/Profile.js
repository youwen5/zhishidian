import React, { Component } from 'react';
import ProfileDetails from './ProfileDetails';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Post from '../Feed/Post';
import getUserPosts from '../databaseManagement/getUserPosts';
import Alert from '../Alert';
import { CircularProgress } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import getUserDetails from '../databaseManagement/getUserDetails';
import LinearIndeterminate from '../LinearIndeterminate';
import GetMore from '../Feed/GetMore';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    card: {
        padding: theme.spacing(2),
    },
    circularLoading: {
        position: "absolute",
        left: "50%",
        transform: "translate(-50%)",
    },
});

class Profile extends Component {
    constructor(props) {
        super();

        this.state = {
            userPosts: [],
            user: {},
            notificationActive: {
                isActive: false,
                notifContent: '',
                notifType: '',
                timeout: 3000
            },
            loadingNewPosts: false,
            morePoststoFetch: true,
            retryAttempts: 0
        };

        this.props = props;
    }
    getUserInfo = async () => {
        try {
            const response = await getUserDetails(this.props.match.params.username);
            
            this.setState({ user: response[0] });

            console.log(response[0]);

            const posts = await getUserPosts(response[0].user_id);

            this.setState({ userPosts: posts });
        } catch(error) {
            if (this.state.retryAttempts < 20) {
                this.getUserInfo();
            } else {
                this.handleNotification('error', 'An error occurred fetching user');
            }
            this.setState({ retryAttempts: this.state.retryAttempts + 1 });
        }
    }
    componentDidMount() {
        this.getUserInfo();
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
    handleGetMorePosts = async (startId) => {
        try {
            this.setState({ loadingNewPosts: true });
            const newPosts = await getUserPosts(this.state.user.user_id, startId);

            if (newPosts.length >= 21) {
                newPosts.pop();
            } else {
                this.setState({ morePoststoFetch: false });
            }
            this.setState({ userPosts: [...this.state.userPosts, ...newPosts] });
            this.setState({ loadingNewPosts: false });
        } catch {
            if (this.state.retryAttempts < 20) {
                this.handleGetMorePosts(startId);
            } else {
                console.log('error occurred fetching');
                this.handleNotification('error', 'Error fetching more posts');
            }
            this.setState({ retryAttempts: this.state.retryAttempts + 1 });
        }
    }
    render() {
        const { classes } = this.props;

        return(
            <>
            <Alert
                 severity={this.state.notificationActive.notifType}
                 autoHide={3000} 
                 isOpen={this.state.notificationActive.isActive} 
                 onClose={this.handleStopNotification}>
                 {this.state.notificationActive.notifContent}
            </Alert>
            { Object.keys(this.state.user).length !== 0
                ? (    
                <>
                <Grid container spacing={2} className={classes.root} style={{padding: 24}} justify='center'>
                    <Grid item xs={12} xl={5} md={5} sm={5} className={classes.card}>
                        <ProfileDetails userDetails={{
                            username: this.state.user.username,
                            firstName: this.state.user.first_name,
                            lastName: this.state.user.last_name,
                            profileColor: this.state.user.profile_color,
                            bio: this.state.user.bio
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} xl={12} />
                    <Grid item xs={12} xl={5}>
                        <Typography variant='h4' align='center'>
                            User Activity:
                        </Typography>
                    </Grid>
                    <Grid item xl={8} md={8} sm={8} lg={8} />
                    <Grid item xs xl={12} />
                    {   this.state.userPosts.length
                        ? this.state.userPosts.map(currentPost => (
                        <>
                        <Grid item xs={12} xl={5} md={5} sm={5} lg={5} className={classes.post}>
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
                        <Grid item xl={8} md={8} sm={8} lg={8} />
                        <GetMore 
                            startId={this.state.userPosts.length ? this.state.userPosts[this.state.userPosts.length - 1].id : 0} 
                            getMorePosts={this.handleGetMorePosts} 
                        />
                        </>
                    ))
                        : (
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress className={classes.circularLoading} />
                            </div>
                        )
                    }
                </Grid>
                </>
                )
                : <LinearIndeterminate />
            }
            </>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(Profile));