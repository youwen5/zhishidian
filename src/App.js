import React, { Component } from 'react';
import './App.css';
import MenuNavBar from './components/Navbar.js';
import Bottomnavigation from './components/BottomNavigation.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <MenuNavBar />
        <Bottomnavigation />
      </div>
    );
  }
}

export default App;
