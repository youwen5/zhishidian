import React, { Component } from 'react';
import ProfileDetails from './ProfileDetails';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Post from '../Feed/Post';
import getAll from '../databaseManagement/getAll';
import Alert from '../Alert';
import { CircularProgress } from '@material-ui/core';

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
    }
});

class Profile extends Component {
    constructor(props) {
        super();

        this.state = {
            userPosts: [],
            username: '',
            userFirstName: '',
            userLastName: '',
            userBio: '',
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
    componentDidMount() {
        this.getUserPosts();
        const { username } = this.props.match.params;
        this.setState({ username: username });
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
            <Grid container spacing={2} className={classes.root} style={{padding: 24}} justify='center'>
                <Grid item xs={12} xl={6} className={classes.card}>
                    <ProfileDetails userDetails={{
                        username: this.state.username
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
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Profile);