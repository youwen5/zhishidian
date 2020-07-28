import React, { Component } from 'react';
import './App.css';
import MenuNavBar from './components/Navbar';
import Feed from './components/Feed/Feed'
import Profile from './components/Profile/Profile';
import PageNotFound from './components/PageNotFound';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      isAuthenticated: false,
      width: 0, 
      height: 0,
      username: ''
    };
    this.props = props;
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  updateAuthentication = async () => {
    this.setState({ isAuthenticated: !this.state.isAuthenticated });
  }
  storeUserCreds = (username) => {
    this.setState({ username: username });
  }
  render() {
    return (
      <Router>
        <div>
          <MenuNavBar isAuthenticated={this.state.isAuthenticated}/>
        </div>
        <div>
          <Switch>
            <Redirect from="/" to="/feed" exact />
            <Redirect from="/profile" to={`/profile/${this.state.username}`} exact />
            <Route 
              path="/login" 
              exact 
              render={() => (
              !this.state.isAuthenticated
                ? (
                  <Login 
                    updateAuthentication={this.updateAuthentication} 
                    width={this.state.width}
                    storeCreds={this.storeUserCreds}
                  />
                ) : <Redirect to='/feed' />
              )}
              />
            <Route path='/feed' exact render={() => (
              this.state.isAuthenticated === true
                ? <Feed username={this.state.username} />
                : <Redirect to='/login' />
            )} 
            />
            <Route path='/profile/:username' render={() => (
              this.state.isAuthenticated === true
                ? <Profile />
                : <Redirect to='/login' />
            )} 
            />
            <Route exact component={ PageNotFound } />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;