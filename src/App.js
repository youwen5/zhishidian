import React, { Component } from 'react';
import './App.css';
import MenuNavBar from './components/Navbar';
import Bottomnavigation from './components/BottomNavigation';
import Feed from './components/testFeed';
import Profile from './components/testProfile';
import PageNotFound from './components/PageNotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <MenuNavBar />
          <Bottomnavigation />
        </div>
        <div>
          <Switch>
            <Route path="/" exact component={ Feed } />
            <Route path="/profile" exact component={ Profile } />
            <Route exact component={ PageNotFound } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
