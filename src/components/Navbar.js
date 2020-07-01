import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import logo from './logo.svg';
import SimpleBottomNavigation from './BottomNavigation';

class NavBar extends Component {
    constructor() {
        super();
        this.state = { width: 0, height: 0 };
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
    render() {
        return(
            <div>
            <AppBar position="static" color="default">
                <Toolbar>
                    <img src={logo} className="App-logo" alt="logo" />
                    <div>
                        {this.state.width > 600
                        ? <div>
                        <Typography variant="h6" color="inherit">
                        Zhi Shi Dian
                        </Typography>
                        </div>
                        : null }
                    <SimpleBottomNavigation />
                    </div>
                </Toolbar>
            </AppBar>
            </div>
        )
    }
}
export default NavBar;