// import React, { Component } from 'react';
// import logo from './logo.svg';
// import SimpleBottomNavigation from './BottomNavigation';
// import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';

// class NavBar extends Component {
//     constructor(props) {
//         super();
//         this.state = { width: 0, height: 0 };
//         this.props = props;
//         this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
//     }
//     componentDidMount() {
//         this.updateWindowDimensions();
//         window.addEventListener('resize', this.updateWindowDimensions);
//     }
//     componentWillUnmount() {
//         window.removeEventListener('resize', this.updateWindowDimensions);
//     }
//     updateWindowDimensions() {
//         this.setState({ width: window.innerWidth, height: window.innerHeight });
//     }
//     render() {
//         return(
//             <div className={classes.root}>
//             <CssBaseline />
//             <AppBar position="fixed" className={classes.appBar}>
//               <Toolbar>
//                 <IconButton
//                   color="inherit"
//                   aria-label="open drawer"
//                   edge="start"
//                   onClick={handleDrawerToggle}
//                   className={classes.menuButton}
//                 >
//                   <MenuIcon />
//                 </IconButton>
//                 <Typography variant="h6" noWrap>
//                   Responsive drawer
//                 </Typography>
//               </Toolbar>
//             </AppBar>
//             <nav className={classes.drawer} aria-label="mailbox folders">
//               {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//               <Hidden smUp implementation="css">
//                 <Drawer
//                   container={container}
//                   variant="temporary"
//                   anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//                   open={mobileOpen}
//                   onClose={handleDrawerToggle}
//                   classes={{
//                     paper: classes.drawerPaper,
//                   }}
//                   ModalProps={{
//                     keepMounted: true, // Better open performance on mobile.
//                   }}
//                 >
//                   {drawer}
//                 </Drawer>
//               </Hidden>
//               <Hidden xsDown implementation="css">
//                 <Drawer
//                   classes={{
//                     paper: classes.drawerPaper,
//                   }}
//                   variant="permanent"
//                   open
//                 >
//                   {drawer}
//                 </Drawer>
//               </Hidden>
//             </nav>
//             </div>
//             <div>
//             <AppBar position="static" color="default">
//                 <Toolbar> 
//                     <Grid container alignItems='center' justify='center'>
//                         <Grid item>
//                             <img src={logo} className="App-logo" alt="logo" />
//                         </Grid>
//                         {this.state.width > 600
//                         ? <div>
//                         <Grid item>
//                             <Typography variant="h6" color="inherit">
//                             Zhi Shi Dian
//                             </Typography>
//                         </Grid>
//                         </div>
//                         : null }
//                         <Grid item>
//                             <SimpleBottomNavigation isAuthenticated={this.props.isAuthenticated} />
//                         </Grid>
//                     </Grid>
//                 </Toolbar>
//             </AppBar>
//             </div>
//         )
//     }
// }
// export default NavBar;
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItemIcon, ListItemText, Toolbar, Typography, ListItem } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
root: {
    display: 'flex',
},
drawer: {
    [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0,
    },
},
appBar: {
    [theme.breakpoints.up('sm')]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    },
},
menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
    display: 'none',
    },
},
// necessary for content to be below app bar
toolbar: theme.mixins.toolbar,
drawerPaper: {
    width: drawerWidth,
},
content: {
    flexGrow: 1,
    padding: theme.spacing(3),
},
}));

function Navbar(props) {
const { window } = props;
const classes = useStyles();
const theme = useTheme();
const [mobileOpen, setMobileOpen] = React.useState(false);

const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
};

const drawer = (
    <div>
    <div className={classes.toolbar} />
        <Divider />
        <List>
            <ListItem button key={'feed'} component={Link} to='/feed'>
                <ListItemIcon><DynamicFeedIcon /></ListItemIcon>
                <ListItemText primary={'Feed'} />
            </ListItem>
            <ListItem button key={'profile'} component={Link} to='/profile'>
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary={'My Profile'} />
            </ListItem>
            <ListItem button key={'assignments'} component={Link} to='/assignments'>
                <ListItemIcon><AssignmentIcon /></ListItemIcon>
                <ListItemText primary={'Assignments'} />
            </ListItem>
        </List>
        <Divider />
    {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
        ))}
    </List> */}
    </div>
);

const container = window !== undefined ? () => window().document.body : undefined;

return (
    <div className={classes.root}>
    <CssBaseline />
    <div className={classes.toolbar}>
        <AppBar position='fixed' color='default' className={props.isAuthenticated ? classes.appBar : null}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                Zhi Shi Dian
            </Typography>
            </Toolbar>
        </AppBar>
    </div>
    { props.isAuthenticated
    ? (
    <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
        <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
            paper: classes.drawerPaper,
            }}
            ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            }}
        >
            {drawer}
        </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
        <Drawer
            classes={{
            paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
        >
            {drawer}
        </Drawer>
        </Hidden>
    </nav>
    ) : null }
    </div>
);
}

export default Navbar;
