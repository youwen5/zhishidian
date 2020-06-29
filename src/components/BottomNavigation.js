import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: "7.5%",
    left: "50%",
    transform: "translateY(-50%)",
    // eslint-disable-next-line
    transform: "translateX(-50%)"
  },
  
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const location = useLocation();

  return (
    <div>
        <BottomNavigation
        value={location.pathname}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
        >
        <BottomNavigationAction component={Link} to="/" value="/" label="Feed" icon={<DynamicFeedIcon />} />
        <BottomNavigationAction component={Link} to="/profile" value="/profile" label="Profile" icon={<AccountCircleIcon />} />
        </BottomNavigation>
    </div>
  );
}
