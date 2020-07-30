import React from 'react';
import MobileSignup from './MobileSignup';
import DesktopSignup from './DesktopSignup';
import { Grid } from '@material-ui/core';

class Signup extends React.Component {
    constructor(props) {
        super();
        this.props = props;
    }
    render() {
        return (
            <Grid 
                container 
                justify='center' 
                alignItems='center'
                style={{paddingTop: 100}}
            >
                <Grid item xs={8} xl={3} sm={5} lg={4} md={4}>
                    { this.props.width > 600
                        ? <DesktopSignup />
                        : <MobileSignup />
                    }
                </Grid>
            </Grid>

        )
    }
}

export default Signup;