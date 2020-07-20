import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import SearchButton from './SearchButton';
import RefreshButton from './RefreshButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    }
});

export default function UpperActions(props) {
    const classes = useStyles();

    const [searchString, setSearchString] = React.useState('');

    const handleSearchChange = (event) => {
        setSearchString(event.target.value);
    }

     return(
        <>
            <Grid container className={classes.root}>
                <Grid item xs xl={9}>
                    <TextField
                    id="searchInput"
                    placeholder="Search"   
                    margin="normal"
                    onChange={handleSearchChange}
                    variant="outlined"
                    fullWidth
                    />
                </Grid>
                <Grid item xs xl={2} style={{paddingTop: 20, paddingLeft: 2}}>
                    <SearchButton />
                </Grid>
                <Grid item xs xl={1} style={{paddingTop: 20}}>
                    <RefreshButton handleRefresh={props.causeReload} />
                </Grid>
            </Grid>
        </>
     )
}