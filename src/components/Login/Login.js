import React from 'react';
import { Grid } from '@material-ui/core';
import DesktopLogin from './DesktopLogin';
import MobileLogin from './MobileLogin';
import { withStyles } from '@material-ui/core/styles';
import authUser from '../databaseManagement/authUser';
import { withRouter } from 'react-router-dom';
import Alert from '../Alert';
import LoadingScreen from '../LoadingScreen';

const styles = {
    root: {
        display: 'flex',
        flexGrow: 1,
        flexWrap: 'wrap'
    }
}

class Login extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            notificationActive: {
                isActive: false,
                notifContent: '',
                notifType: '',
                timeout: 3000
            },
            loadingActive: false
        }
    }
    authenticate = async (username, password) => {
        if (!username || !password) {
            this.handleNotification('info', 'Username or password cannot be blank');
        } else {
            try {
                this.setState({ loadingActive: true });
                const response = await authUser(username, password);

                if (response[0].statusCode === 401) {
                    this.handleNotification('warning', 'Username or password are incorrect');
                    this.setState({ loadingActive: false });
                } else {
                    this.props.updateAuthentication();
                    this.props.history.push('/feed');
                    this.props.storeCreds(username, response[0].user_id);
                }
            } catch(error) {  
                this.handleNotification('error', 'Unexpected error occurred, try again');
                this.setState({ loadingActive: false });
                console.log(`authentication failed with ${error}`);
            }
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
            <LoadingScreen open={this.state.loadingActive} />
            <Grid 
                container 
                justify='center' 
                alignItems="center"
                className={classes.root}
                style={{paddingTop: 100}}
                spacing={2}
            >
                <Grid item xs={8} xl={3} sm={5} lg={4} md={4}>
                    { this.props.width > 600
                     ? <DesktopLogin 
                         authenticate={this.authenticate}
                         disable={this.state.loadingActive}
                     />
                     : <MobileLogin 
                         authenticate={this.authenticate}
                         disable={this.state.loadingActive}
                     /> }
                </Grid>
            </Grid>
        </>
        )
    }
}

export default withRouter(withStyles(styles)(Login));