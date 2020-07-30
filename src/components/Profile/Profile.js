import React, { Component } from 'react';
import ProfileDetails from './ProfileDetails';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Post from '../Feed/Post';
import getAll from '../databaseManagement/getAll';
import Alert from '../Alert';
import { CircularProgress } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import getUserDetails from '../databaseManagement/getUserDetails';
import LinearIndeterminate from '../LinearIndeterminate';

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
        };

        this.props = props;
    }
    getUserPosts = async () => {
        try {
            const posts = await getAll();

            this.setState({ userPosts: posts });
        } catch(error) {
            console.log(`Error occurred fetching(profile): ${error}`);
        }
    }
    getUserInfo = async () => {
        try {
            const response = await getUserDetails(this.props.match.params.username);
            
            this.setState({ user: response[0] });
        } catch(error) {
            this.handleNotification('error', 'An error occurred fetching user');
        }
    }
    componentDidMount() {
        this.getUserInfo();
        this.getUserPosts();
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
                <Grid container spacing={2} className={classes.root} style={{padding: 24}} justify='center'>
                    <Grid item xs={12} xl={6} className={classes.card}>
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
                    <Grid item xs xl={12} />
                    {   this.state.userPosts.length
                        ? this.state.userPosts.map(currentPost => (
                        <>
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
                        </>
                    ))
                        : (
                            <Grid item xs={12} xl={12} sm={12} md={12} lg={12}>
                                <CircularProgress className={classes.circularLoading} />
                            </Grid>
                        )
                    }
                </Grid>
                )
                : <LinearIndeterminate />
            }
            </>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(Profile));