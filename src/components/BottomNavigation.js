import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
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
    transform: "translateY(-50%)",
    // eslint-disable-next-line
    transform: "translateX(-50%)",
    backgroundColor: "transparent"
  },
  
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);
  let location = useLocation();
  
  if (!(location.pathname.slice(-1) === '/')) {
    location.pathname += '/';
  }

  return (
    <Grid container>
    <div>
        <BottomNavigation
        value={location.pathname}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
        showLabels
        className={classes.root}
        >
        <BottomNavigationAction component={Link} to="/" value="/" label="Feed" icon={<DynamicFeedIcon />} />
        <BottomNavigationAction component={Link} to="/profile/" value="/profile/" label="Profile" icon={<AccountCircleIcon />} />
        </BottomNavigation>
    </div>
    </Grid>
  );
}
