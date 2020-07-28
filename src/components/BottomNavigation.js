import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link, useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: 200,
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: '10%',
    left: "50%",
    transform: "translate(-50%)",
    backgroundColor: "transparent"
  },
  
});

export default function SimpleBottomNavigation(props) {
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);
  let location = useLocation();
  
  let navPathname = location.pathname.slice();

  navPathname = navPathname.split('/')[1];

  return (
    props.isAuthenticated
    ? (
    <div>
        <BottomNavigation
        value={navPathname}
        showLabels
        className={classes.root}
        >
          <BottomNavigationAction component={Link} to="/feed" value="feed" label="Feed" icon={<DynamicFeedIcon />} />
          <BottomNavigationAction component={Link} to="/profile" value="profile" label="Profile" icon={<AccountCircleIcon />} />
          <BottomNavigationAction component={Link} to="/assignments" value="assignments" label="Assignments" icon={<AssignmentIcon />} />
        </BottomNavigation>
    </div>
    ) : null
  );
}
