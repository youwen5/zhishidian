import React, { Component } from 'react';
import './App.css';
import MenuNavBar from './components/Navbar';
import Feed from './components/Feed'
import Post from './components/Post'
import Profile from './components/testProfile';
import PageNotFound from './components/PageNotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <MenuNavBar />
        </div>
        <div>
          <Switch>
            <Route path="/" exact component={ Post } />
            <Route path="/profile" exact component={ Profile } />
            <Route exact component={ PageNotFound } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
