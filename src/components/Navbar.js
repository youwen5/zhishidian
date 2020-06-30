import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import logo from './logo.svg';
import SimpleBottomNavigation from './BottomNavigation';

const NavBar = () => {
    return(
        <div>
        <AppBar position="static" color="default">
            <Toolbar>
                <img src={logo} className="App-logo" alt="logo" />
                <Typography variant="h6" color="inherit">
                Zhi Shi Dian
                </Typography>
                <SimpleBottomNavigation />
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;