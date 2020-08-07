import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    footer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        color: 'black',
    }
});

const Footer = (props) => {
    const classes = useStyles();

    return(
        <div className={classes.footer}>
            <footer>
                <Divider />
                <Link to='/terms'>
                    <Typography 
                        align='right'
                        style={{marginRight: 20}}
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