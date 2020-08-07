import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    footer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
    }
});

const Footer = (props) => {
    const classes = useStyles();

    return(
        <div className={classes.footer}>
            <footer>
                <Link to='/terms'>
                    <Typography 
                        align='left'
                        style={{marginLeft: 20}}
                        variant='body1'
                    >
                        Privacy Policy
                    </Typography>
                </Link>
            </footer>
        </div>
    );
}

export default Footer;